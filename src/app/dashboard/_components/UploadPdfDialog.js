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
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

function UploadPdfDialog({ children, isMaxFile }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDB);
  const getFileURL = useMutation(api.fileStorage.getFileURL);
  const embeddedDocument = useAction(api.myAction.ingest);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [open, setOpen] = useState(false);

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

    const fileID = uuidv4();
    const fileURL = await getFileURL({ storageId: storageId });
    const resp = await addFileEntry({
      fileID: fileID,
      fileName: fileName ?? "Untitled",
      storageId: storageId,
      fileURL: fileURL,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    const ApiResponse = await axios.get("/api/pdf-loader?pdfURL=" + fileURL);
    await embeddedDocument({
      splitText: ApiResponse.data.result,
      fileID: fileID,
    });
    setLoading(false);
    setOpen(false);

    toast("File uploaded successfully");
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            disabled={isMaxFile}
            className="w-full"
          >
            + Upload PDF File
          </Button>
        </DialogTrigger>
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
            <Button onClick={onUpload} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UploadPdfDialog;
