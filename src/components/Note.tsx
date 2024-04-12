import { Note as NoteModel } from "@prisma/client";
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
interface NoteProps {
    note:NoteModel
}

const Note:FC<NoteProps>=({note})=>{
    const wasUpdated=note.updatedAt > note.createdAt;
    const createdUpdatedAtTimestamp = (
        wasUpdated?note.updatedAt : note.createdAt
    ).toString();

    return <Card>
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
}

export default Note;