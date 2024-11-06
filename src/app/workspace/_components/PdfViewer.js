import React from "react";

function PdfViewer({ fileURL }) {
  return (
    <div>
      <iframe
        src={fileURL + "#toolbar=0"}
        height="90vh"
        width="100%"
        className="h-[90vh]"
      />
    </div>
  );
}

export default PdfViewer;
