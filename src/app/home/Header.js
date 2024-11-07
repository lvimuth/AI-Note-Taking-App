import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <Link href={user ? "/dashboard" : "/sign-in"}>
        <img
          src="/logo.svg"
          className="cursor-pointer"
          width={170}
          height={170}
          href="#"
        />
      </Link>
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link href={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link href={"/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
