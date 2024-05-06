"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isUserLoggedIn, hasUserRole } from "../utils/authManager";

export default function UserArea() {
  const { data: session } = useSession();

  // On angular/Vue I would handle this on the router... where I would define what routes are what pages, and what roles/access
  // you need... but didin't find anything like that here so... each page will define what and who will access? maybe a Middleware ?
  if (!isUserLoggedIn(session!)) {
    redirect("/");
  }

  // Inneficient to have the role just hardcoded, should a role change, you would need to change every reference on every page!
  if (!hasUserRole(session!, "roleA")) {
    redirect("/no-role-unauthorized");
  }
  // Main block

  const userName = session!.profile.name;

  return (
    <main>
      <section className="hero">
        <div className="hero-body">
          <p className="title">&#128274;Secured Page by Role</p>
          <p className="subtitle">Welcome, {userName}</p>
        </div>
      </section>
    </main>
  );
}
