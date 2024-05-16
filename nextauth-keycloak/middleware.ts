import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { hasUserRoleOnToken } from "@/app/utils/authManager"

export default withAuth(
  function middleware(req) {
    // OPTION A: LOGIC ON MIDDLEWARE WRAPPER withAuth
    //
    // Seems the more "flexible" one, check option B, both are fearsible, all depends on "what you want/complexity"
    // The only advantage of using the OPTION A is that you can redirect the user that has token but not a role to a 
    // specific custom page, not the default behaivour of redirecting to login page...
    //
    const pathTarget = req.nextUrl.pathname
    const token = req.nextauth.token

    if (pathTarget.startsWith('/secure-page-visible-by-middleware')) {
      if (!hasUserRoleOnToken(token!, 'roleA')) {
        return NextResponse.redirect(new URL('/no-role-unauthorized', req.url))
      }
    }
  },
  {
    // OPTION B: LOGIC ON CALLBACK

    //
    //
    //
    // callbacks: {
    //   authorized({ req, token }) {
    //     // This is kinda confusing, the withAuth middleware is more than enough to check the contents of the token, and the request url target...
    //     // But by its definition, is this authorized callback the one that should check the token, then return true (can access) or false (redirect to login) 
    //     // depending on your needs, in this case, its roles, but only on specific pages...
    //     // 
    //     // While it can be done here, if you want to redirect a user that has a token but not the role to a custom page, you can't do it here!
    //     // This callback just expects a "true" or "false", while the middleware could return a nextResponse with a rewrite or redirect... and can check
    //     // the token contents (the console log on line 9)... but there we would require to redirect manually with NextResponse to the login when the req
    //     // does not have a token... And nextjs doesnt recommend "extensive" session management on the middleware...

    //     // This is the token, not the session obj! Remember how [...nextauth].ts modified this token.
    //     if (token) {
    //       if (req.nextUrl.pathname.startsWith('/secure-page-visible-by-middleware')) {
    //         if (!hasUserRoleOnToken(token!, "roleA")) {
    //           return true
    //         } else {
    //           // you can't here redirect the user to a page... so return false/remove the else block or extend at your needs.
    //         }
    //       }
    //     }
    //     return false
    //   }
    // },
  }
)
// Only securing with middleware this page.
export const config = { matcher: ['/secure-page-visible-by-middleware'] }