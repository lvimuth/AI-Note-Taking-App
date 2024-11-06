import { useAction } from "convex/react";
import {
  Bold,
  Code,
  Highlighter,
  Italic,
  QuoteIcon,
  SparklesIcon,
  Subscript,
  Superscript,
  Underline,
} from "lucide-react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";

function EditorExtensions({ editor }) {
  const { fileID } = useParams();
  const SearchAI = useAction(api.myAction.search);

  const onAiClick = async () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log(fileID, selectedText);

    const result = await SearchAI({
      query: selectedText,
      fileID: fileID,
    });
    console.log(result);
  };
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
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "text-blue-500" : ""}
            >
              <Code />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "text-blue-500" : ""}
            >
              <Highlighter />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={editor.isActive("subscript") ? "text-blue-500" : ""}
            >
              <Subscript />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={editor.isActive("superscript") ? "text-blue-500" : ""}
            >
              <Superscript />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "text-blue-500" : ""}
            >
              <QuoteIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "text-blue-500" : ""}
            >
              <Underline />
            </button>

            <button
              title="Take Notes from AI"
              onClick={() => onAiClick()}
              className={"hover:text-blue-500"}
            >
              <SparklesIcon />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtensions;
