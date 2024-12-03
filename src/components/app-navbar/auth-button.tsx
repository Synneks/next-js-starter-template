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
    const signOutClick = () => {
      signOut({ callbackUrl: "/" });
    };
    if (minimal) {
      return (
        <Button onClick={signOutClick} color="danger" variant="ghost">
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
          <DropdownItem key="sign-out" color="danger" onClick={signOutClick}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/profile" })}
      color="default"
      variant="ghost"
    >
      <IconBrandGoogle />
      Sign In
    </Button>
  );
}
