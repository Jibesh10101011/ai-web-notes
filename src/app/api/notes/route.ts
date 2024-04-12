import prisma from "@/lib/db/prisma";
import { createNoteSchema } from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";

export async function POST(req:Request) {
    try {

        const {userId}=auth();
        if(!userId) {
            return Response.json({message:"Unauthorized"},{status:401});
        }
        const body=await req.json();
        const parseResult=createNoteSchema.safeParse(body);
        if(!parseResult.success) {
            console.log(parseResult.error);
            return Response.json({message:"Invalid input"},{status:400});
        }

        const {title,content}=parseResult.data;

        const note=await prisma.note.create({
            data:{
                title,
                content,
                userId
            },
        })

    } catch(error) {
        console.error(error);
        return Response.json({message:"Internal Server Error"},{status:500});
    }
}