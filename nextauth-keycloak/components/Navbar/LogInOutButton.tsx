import { useSession, signIn, signOut } from "next-auth/react";

export default function LogInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          className="button is-primary"
          onClick={() => signOut({ callbackUrl: "/api/auth/logout" })}
        >
          Log out
        </button>
      </>
    );
  }
  return (
    <>
      <button className="button is-primary" onClick={() => signIn("keycloak")}>
        Log in
      </button>
    </>
  );
}
