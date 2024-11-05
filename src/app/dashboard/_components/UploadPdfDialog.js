"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";

function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDB);
  const getFileURL = useMutation(api.fileStorage.getFileURL);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const onUpload = async () => {
    setLoading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("File uploaded successfully", storageId);
    setLoading(false);

    const fileID = uuidv4();
    const fileURL = await getFileURL({ storageId: storageId });
    const resp = await addFileEntry({
      fileID: fileID,
      fileName: fileName ?? "Untitled",
      storageId: storageId,
      fileURL: fileURL,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    console.log(resp);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload PDF File</DialogTitle>
            <DialogDescription asChild>
              <div className="">
                <h2 className="mt-5">Select a file to Uplaod</h2>
                <div className=" gap-2  p-3 rounded-lg border">
                  <input
                    type="file"
                    name=""
                    accept="application/pdf"
                    onChange={(event) => OnFileSelect(event)}
                  />
                </div>
                <div className="mt-2">
                  <label>File Name</label>
                  <Input
                    placeholder="File Name"
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
                <div></div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={onUpload}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UploadPdfDialog;
