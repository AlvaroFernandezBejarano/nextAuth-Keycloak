// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    // Basic Logout, sends to Keycloak logout frontend, then that it.
    // res.redirect(`${process.env.KEYCLOAK_URL}/protocol/openid-connect/logout`)
    // https://www.keycloak.org/docs/latest/securing_apps/index.html#logout
    // The "good" version should be using post_logout_redirect_uri and id_token_hint params...
    // But it is kinda bad too... sends you to keycloack logout, then redirects to the uri.
    res.redirect(`${process.env.KEYCLOAK_URL}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL as string)}&client_id=${process.env.CLIENT_ID}`);
}