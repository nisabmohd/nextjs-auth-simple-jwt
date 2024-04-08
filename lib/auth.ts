import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type UserCredentials = {
  email: string;
  password: string;
};

const JWTSECRET = new TextEncoder().encode("secret-key-jwt");

async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(JWTSECRET);
}

async function decrypt(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWTSECRET, {
      algorithms: ["HS256"],
    });
    return payload?.user;
  } catch {
    return null;
  }
}

export async function login(credentials: UserCredentials) {
  // logic for verify user credentials from db
  // user from db
  const user = { email: credentials.email };
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return (await decrypt(session)) as { email: string } | null;
}

export async function updateSession(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  if (!session) return null;

  const user = (await decrypt(session)) as { email: string };
  const expires = new Date(Date.now() + 10 * 1000);
  const newSession = await encrypt({ user, expires });

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: newSession,
    httpOnly: true,
    expires,
  });
  return res;
}
