"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function UserArea() {
  const { data: session } = useSession()

  // Main block

  const userName = session!.profile.name

  return (
    <main>
      <section className="hero">
        <div className="hero-body">
          <p className="title">&#128533;Unauthorized!</p>
          <p className="subtitle">
             Hey, {userName}, you seem to not have the Role required to access that page
          </p>
          <p className="subtitle">
          <Link className="navbar-item" href={"/"}>
            Go home!
          </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
