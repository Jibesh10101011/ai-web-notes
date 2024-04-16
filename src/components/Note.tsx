"use client";

import { Note as NoteModel } from "@prisma/client";
import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import AddEditNoteDialog from "./AddEditNoteDialog";
interface NoteProps {
  note: NoteModel;
}

const Note: FC<NoteProps> = ({ note }) => {
  const [showEditDialog, setShowAddEditNoteDialog] = useState<boolean>(false);
  const wasUpdated = note.updatedAt > note.createdAt;
  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toString();

  return (
    <>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={()=>setShowAddEditNoteDialog(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && "(Updated)"}
          </CardDescription>
          <CardContent>
            <p className="whitespace-pre-line">{note.content}</p>
          </CardContent>
        </CardHeader>
      </Card>
      <AddEditNoteDialog
        open={showEditDialog}
        setOpen={setShowAddEditNoteDialog}
        noteToEdit={note}
      />
    </>
  );
};

export default Note;
