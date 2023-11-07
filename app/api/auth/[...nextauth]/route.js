import NextAuth from "next-auth";
import { options } from "../../../../libs/options";

const handle = NextAuth(options);

export { handle as GET, handle as POST };
