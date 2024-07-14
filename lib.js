import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = "secret"
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "H256"})
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key)
}

export async function decrypt(input) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["H256"],
    })
    return payload
}

export async function login() {
    const expires = new Date(Date.now() + 10 * 1000)
    const session = { user: "yo", expires: "10 sec from now"}
    
    cookies().set("session", session, {expires, httpOnly:true})
}