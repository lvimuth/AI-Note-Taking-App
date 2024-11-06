import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import EditorExtensions from "./EditorExtensions";
function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
      Text,
      Bold,
      Placeholder.configure({
        placeholder: "Type your note here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });

  return (
    <div>
      <EditorExtensions editor={editor} />
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
