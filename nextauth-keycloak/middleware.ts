// Was a good idea, but doesn't work, check the readme!

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // here is the problem, always returns null! Just check this:
  // https://github.com/nextauthjs/next-auth/issues/5170

  // const token = await getToken({
  //   req: request,
  //   secret: process.env.SECRET,
  // })
  // console.log('-------MIDDLEWARE------')
  // console.log(token)

  // Here you would extend to check if the route is accessible, roles... etc

  return NextResponse.next();
}
