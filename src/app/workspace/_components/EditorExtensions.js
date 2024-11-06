import { Bold, Italic } from "lucide-react";
import React from "react";

function EditorExtensions({ editor }) {
  return (
    editor && (
      <div className="px-5 py-3 shadow-md bg-gray-100 ">
        <div className="control-group">
          <div className="button-group flex gap-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "text-blue-500" : ""}
            >
              <Bold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-blue-500" : ""}
            >
              <Italic />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtensions;
