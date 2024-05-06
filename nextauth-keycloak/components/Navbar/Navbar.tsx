import { useSession, signIn, signOut } from "next-auth/react";
import LogInOutButton from "./LogInOutButton";
import Link from "next/link";

export const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" href={"/"}>
          &#127968;Home
        </Link>
      </div>

      <div id="navbarBasic" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" href={"/secure-page-visible"}>
            Secured Page but visible
          </Link>
          {status == "authenticated" && (
            <Link className="navbar-item" href={"/secure-page"}>
              Secured Page
            </Link>
          )}
          {status == "authenticated" && (
            <Link className="navbar-item" href={"/secure-page-role"}>
              Secured Page by Role
            </Link>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <LogInOutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
