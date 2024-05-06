"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from "react"
import { redirect } from "next/navigation"
import { isUserLoggedIn } from "../utils/authManager"


export default function UserArea() {
  const { data: session, status, update } = useSession()

  // On angular/Vue I would handle this on the router... where I would define what routes are what pages, and what roles/access
  // you need... but didin't find anything like that here so... each page will define what and who will access? maybe a Middleware ?
  if (!isUserLoggedIn(session!)) {
    redirect("/")
  }
  // Main block

  const userName = session!.profile.name

  return (
    <main>
      <section className="hero">
        <div className="hero-body">
          <p className="title">&#128275;Secured Page visible on the navbar!</p>
          <p className="subtitle">
            Welcome, {userName}
          </p>
        </div>
      </section>

    </main>
  )
}
