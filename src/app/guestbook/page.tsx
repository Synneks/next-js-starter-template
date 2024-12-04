import { Button, Card, CardBody, Textarea } from "@nextui-org/react";

export default function GuestBook() {
  return (
    <Card className="mx-auto mt-4 max-w-lg">
      <CardBody>
        <h1 className="text-center text-5xl">Welcome to the GuestBook</h1>
        <form className="mt-4 flex flex-col gap-2">
          <Textarea
            label="Leave a message"
            placeholder="Type your message here..."
            className="w-full"
          />
          <Button>Create</Button>
        </form>
      </CardBody>
    </Card>
  );
}
