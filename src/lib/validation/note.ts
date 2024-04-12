import {z} from "zod";

export const createNoteSchema = z.object({
    title:z.string().min(1,{message:"Title is required"}),
    content:z.string().min(2,{message:"Content is required"}),
});

export type createNoteSchema = z.infer<typeof createNoteSchema>
