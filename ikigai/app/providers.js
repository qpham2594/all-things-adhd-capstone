// use client - allows access to next-auth client functionality within API route
"use client";

import {SessionProvider} from 'next-auth/react'

export const AuthProvider = ({children}) => {
    return <SessionProvider> {children} </SessionProvider>
}