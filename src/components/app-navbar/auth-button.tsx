import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton({ minimal = true }: { minimal?: boolean }) {
  const { data, status } = useSession();

  if (status === "loading") {
    return <CircularProgress aria-label="Loading" />;
  }

  if (status === "authenticated") {
    if (minimal) {
      return (
        <Button onClick={() => signOut()} color="danger" variant="ghost">
          Sign Out
        </Button>
      );
    }
    return (
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: data.user?.image || undefined,
              showFallback: !data.user?.image,
            }}
            className="transition-transform"
            name={data.user?.name}
            aria-label={data.user?.name || "User menu"}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{data.user?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="sign-out" color="danger" onClick={() => signOut()}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Button onClick={() => signIn("google")} color="danger" variant="ghost">
      <IconBrandGoogle />
      Sign In
    </Button>
  );
}
