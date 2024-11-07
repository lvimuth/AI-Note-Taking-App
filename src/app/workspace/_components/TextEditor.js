import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import EditorExtensions from "./EditorExtensions";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const TextEditor = forwardRef(({ fileID, onModifiedChange }, ref) => {
  const [isModified, setIsModified] = useState(false);
  const { user } = useUser();
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
    onUpdate: ({ editor }) => {
      setIsModified(true);
      onModifiedChange(true); // Notify parent that there is a modification
    },
  });

  const notes = useQuery(api.notes.GetNotes, { fileID: fileID });

  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
    }
  }, [notes, editor]);

  const saveNotes = useMutation(api.notes.AddNotes);

  // Define the save function
  const handleSave = () => {
    if (editor) {
      saveNotes({
        notes: editor.getHTML(),
        fileID: fileID,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setIsModified(false); // Reset modification status after saving
      onModifiedChange(false);
    }
  };

  // Expose handleSave to parent via ref
  useImperativeHandle(ref, () => ({
    handleSave,
  }));

  return (
    <div>
      <EditorExtensions editor={editor} saveNotes={handleSave} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

export default TextEditor;
