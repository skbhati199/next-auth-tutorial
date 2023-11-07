import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/CreateUser") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (token.role === "admin") {
          return true;
        }
        return false
      },
    },
  }
);

// export function middleware(request) {
//   console.log(request.nextUrl?.pathname);
//   console.log(request.nextauth?.token?.role);
//   if (
//     request.nextUrl.pathname.startsWith("/CreateUser") &&
//     request.nextauth?.token?.role != "admin"
//   ) {
//     return NextResponse.rewrite(new URL("/Denied", request.url));
//   }
// }

export const config = {
  matcher: ["/CreateUser",
  //  "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
};
