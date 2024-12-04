import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import authOptions from "@/config/auth";

// this function is used to check if the user is authenticated
// this function is needed in order to check if the user is authenticated and
// should be called on every page that requires authentication
// this solution is used in order to keep the database session strategy since
// next js paired with next auth uses JWT session strategy and when you are using
// adapters for next auth the strategy is set by default to database
export default async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
}
