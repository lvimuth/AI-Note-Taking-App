"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import TextEditor from "../_components/TextEditor";
import { toast } from "sonner";

function Workspace() {
  const { fileID } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileID: fileID });
  const textEditorRef = useRef(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    console.log("FileInfo ", fileInfo);
  }, [fileInfo]);
  const onSave = () => {
    if (textEditorRef.current) {
      toast("Saving...");
      textEditorRef.current.handleSave();
    }
  };
  return (
    <div>
      <WorkspaceHeader
        fileName={fileInfo?.fileName}
        onSave={onSave}
        isModified={isModified}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          {/* Text Editor */}
          <TextEditor
            fileID={fileID}
            ref={textEditorRef}
            onModifiedChange={setIsModified}
          />
        </div>
        <div>
          {/* PDF viewer */}
          <PdfViewer fileURL={fileInfo?.fileURL} />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
