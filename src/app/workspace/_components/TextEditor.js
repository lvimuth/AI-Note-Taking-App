import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import EditorExtensions from "./EditorExtensions";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

function TextEditor({ fileID }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileID: fileID,
  });

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

  useEffect(() => {
    editor && editor.commands.setContent(notes);
  }, [notes && editor]);

  return (
    <div>
      <EditorExtensions editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
