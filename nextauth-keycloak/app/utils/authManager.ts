import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// Just a simple check of session , so we don't repeat this sinppet of code everywhere.
// Plus this can be extended to do so much more

export function isUserLoggedIn(session: Session) {
  return Boolean(session)
}

export function hasUserRole(session: Session, role: string) {
  const roles: string[] = session.roles as string[]
    if (roles.includes(role)){
      return true
    }

  return false
}
// This one is an example for checking the roles on the token object, to use on middleware.
export function hasUserRoleOnToken(token: JWT, role: string) {
  const roles: string[] = token.client_roles as string[]
    if (roles.includes(role)){
      return true
    }

  return false
}