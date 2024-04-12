import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Flowbrain - Notes",
};

const Page: FC<pageProps> = async ({}) => {
  const { userId } = auth();
  if (!userId) {
    throw Error("UserId undefined");
  }
  const allNotes = await prisma.note.findMany({ where: { userId } });

  return (
    <>
      <h1>All Notes</h1>
      <div>{JSON.stringify(allNotes)}</div>
    </>
  );
};

export default Page;
