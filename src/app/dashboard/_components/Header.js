import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header({ user }) {
  if (user) {
    console.log("User", user.fullName ? user.fullName : user.firstName);
  }
  return (
    <div>
      <div className="flex justify-between p-5 shadow-md">
        <div></div>
        <h1 className="">
          <span className="font-bold">Welcome </span>{" "}
          {user?.fullName ? user?.fullName : user?.firstName}
        </h1>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
