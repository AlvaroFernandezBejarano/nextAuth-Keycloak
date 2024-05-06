import NextAuth, { NextAuthOptions, Profile, Session } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";
import { decodeToken } from "react-jwt";

declare module "next-auth"{
  interface Session {
    // you can be more specific here with your types.
    account: any
    profile: any
  }

  interface Profile {
    // Could be realm, client, etc.
    realm_access: any
  }

  interface Session {
    // While we added the roles on profile, maybe you want an easier way to access? Group all realm/client roles?
    // You could ignore this completly.
    roles: any
  }
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    KeycloakProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.SECRET as string,
      issuer: process.env.KEYCLOAK_URL as string,
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      try {
        if (account) {
          console.log('--------------ACCESS TOKEN ---------------')
          const decodedToken = decodeToken(account.access_token as any)
          if (token == null){
            throw new Error("Unnable to decode token")
          }
          console.log(decodedToken)
          console.log('--------------ROLES---------------')
          // console.log(decodedToken.resource_access)
          // Do something here to add more info, maybe just overwrite profile (thats the one that should have this info)
          profile = decodedToken as Profile
          token.account = account
        }
        if (profile) {
          console.log('--------------PROFILE---------------')
          console.log(profile)
          token.profile = profile
          // Then do here the assignation of roles elements to token so session has access
          // This can be modified so uses by client, realm or account BE AWARE OF THAT!
          // Modify the "resource_access['next-auth-AFB']" value to the one your resource/realm/accout
          // json scope roles you need

          // While the info is already on profile, we could make a new key on the json response of session
          const clientRoles = profile.realm_access.roles
          token.client_roles = clientRoles
        }
      } catch (error) {
        console.log(error)
      }
      return token
    },
    async session({ session, token, trigger }) {
      // Token interceptor to add token info to the session to use on the pages.
      console.log('async session accessed')

      session.account = token.account
      session.profile = token.profile
      session.roles = token.client_roles
      return session
    }
  }
}

export default NextAuth(authOptions)
