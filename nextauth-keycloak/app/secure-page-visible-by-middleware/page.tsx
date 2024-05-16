"use client"

import { useSession } from "next-auth/react"

export default function UserArea() {
  const { data: session, status, update } = useSession()

  // Main block

  // MIDDLEWARE IMPLEMENTATION! NO CHECKS ON PAGE!
  //
  // Now the page is not the one defining/checking if the user is auth, this is controlled by the middleware.
  //
  // Both options are okey, and in the end you (usually) will use the session obj to 
  // access username or roles and hide/show elements on the page... usually... you can play with
  // middleware to remove the necesity of the "use client" policy and session management with a strict
  // logic on the middleware, you can experiment!
  const userName = session!.profile.name

  return (
    <main>
      <section className="hero">
        <div className="hero-body">
          <p className="title">&#128275;Secured Page visible on the navbar, secured by Middleware!</p>
          <p className="subtitle">
            Welcome, {userName}
          </p>
        </div>
      </section>
    </main>
  )
}
