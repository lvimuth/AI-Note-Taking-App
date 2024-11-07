import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function WorkspaceHeader({ fileName, onSave, isModified }) {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleNavigation = () => {
    if (isSignedIn) {
      router.push("/dashboard"); // Navigate to the dashboard if the user is signed in
    } else {
      router.push("/"); // Navigate to the homepage otherwise
    }
  };
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Image src={"/logo.svg"} alt="logo" width={140} height={100} />
      <h2 className="font-bold">{fileName}</h2>
      <div className="flex gap-4 items-center">
        <Button variant="outline" onClick={handleNavigation}>
          <ArrowBigLeft />
        </Button>
        <Button
          onClick={onSave}
          disabled={!isModified}
          title="Save the text editor"
        >
          Save
        </Button>
        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
