"use client";

import { Button } from "@/components/ui/button";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

function SideBar() {
  const numberOfFilesUploaded = 5;
  const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress.emailAddress,
  });
  return (
    <div className="shadow-md h-screen p-7">
      <Image src={"/logo.svg"} alt="logo" width={170} height={120} />
      <div className="mt-10">
        <UploadPdfDialog
          isMaxFile={fileList?.length >= numberOfFilesUploaded ? true : false}
        >
          <Button className="w-full">+ Upload PDF</Button>
        </UploadPdfDialog>
        <div className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-20 w-[80%]">
        <Progress value={(fileList?.length / numberOfFilesUploaded) * 100} />
        <p className="text-sm mt-1">{fileList?.length} out of 5 PDF Uploaded</p>
        <p className="text-sm text-gray-400 mt-2">Upgrade to upload more PDF</p>
      </div>
    </div>
  );
}

export default SideBar;
