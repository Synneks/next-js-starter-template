"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";

import { InsertGuestbookEntry } from "@/db/schema/guestbook-entries";

import { createGuestbookEntry } from "./action";

export default function GuestbookClient() {
  const [lastResult, action] = useFormState(createGuestbookEntry, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: InsertGuestbookEntry });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="mt-4 flex flex-col gap-2"
    >
      <Textarea
        label="Leave a message"
        key={fields.message.key}
        name={fields.message.name}
        placeholder="Type your message here..."
        className="w-full"
        errorMessage={fields.message.errors}
        isInvalid={!fields.message.valid}
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
