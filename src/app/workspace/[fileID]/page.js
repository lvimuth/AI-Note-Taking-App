"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

function Workspace() {
  const { fileID } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileID: fileID });

  useEffect(() => {
    console.log("FileInfo ", fileInfo);
  }, [fileInfo]);

  return (
    <div>
      <WorkspaceHeader />
      <div className="grid grid-cols-2 gap-2">
        <div>{/* Text Editor */}</div>
        <div>
          {/* PDF viewer */}
          <PdfViewer fileURL={fileInfo?.fileURL} />
        </div>
      </div>
    </div>
  );
}

export default Workspace;