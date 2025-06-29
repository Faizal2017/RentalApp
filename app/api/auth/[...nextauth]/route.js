import NextAuth from "next-auth/next";

import { authOptions } from "@/utils/authOptions";

const handler = NextAuth.default(authOptions);

export { handler as GET, handler as POST };
