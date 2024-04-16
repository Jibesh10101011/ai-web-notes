import Note from "@/components/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Notes-studnet",
};

const Page: FC<pageProps> = async ({}) => {
  const { userId } = auth();
  if (!userId) {
    throw Error("UserId undefined");
  }

  const allNotes = await prisma.note.findMany({ where: { userId } });
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      {allNotes.length === 0 && (
        <div className="col-span-full text-center">
           You don&rsquo;t have any notes yet. Why don&rsquo;t you create one ?
        </div>
      )}
    </div>
  );
};

export default Page;
