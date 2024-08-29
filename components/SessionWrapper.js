"use client"

import { SessionProvider } from "next-auth/react"
import { Children } from "react"

export default function SessionWrapper({children}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}