import { redirect } from "next/navigation"

export async function GET (request: any) {
    // Basic Logout, sends to Keycloak logout frontend, then that it.
    // res.redirect(`${process.env.KEYCLOAK_URL}/protocol/openid-connect/logout`)
    // https://www.keycloak.org/docs/latest/securing_apps/index.html#logout
    redirect(`${process.env.KEYCLOAK_URL}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL as string)}&client_id=${process.env.CLIENT_ID}`);
}