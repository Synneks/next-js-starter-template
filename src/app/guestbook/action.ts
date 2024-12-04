"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import { getServerSession } from "next-auth";

import authOptions from "@/config/auth";
import db from "@/db";
import guestbookEntries, {
  InsertGuestbookEntry,
} from "@/db/schema/guestbook-entries";
import requireAuth from "@/utils/require-auth";

export async function createGuestbookEntry(
  prevState: unknown,
  formData: FormData
) {
  await requireAuth();
  // zod validation
  const submission = parseWithZod(formData, {
    schema: InsertGuestbookEntry,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const session = (await getServerSession(authOptions))!;

  await db
    .insert(guestbookEntries)
    .values({ userId: session.user.id, message: submission.value.message });

  // so that next js knows to refetch the data on that page
  revalidatePath("/guestbook");
  redirect("/guestbook");
}
