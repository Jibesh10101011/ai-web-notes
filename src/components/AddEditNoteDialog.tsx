import { createNoteSchema, CreateNoteSchema } from "@/lib/validation/note";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./ui/loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import axios from "axios";

interface AddEditNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
}

const AddEditNoteDialog: FC<AddEditNoteDialogProps> = ({
  open,
  setOpen,
  noteToEdit,
}) => {
  const [deleteInProgress,setDeleteInProgress]=useState<boolean>(false);
  const router = useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  async function onSubmit(input: CreateNoteSchema) {
    try {

      if(noteToEdit) {
        const response=await axios.put("/api/notes",{
          id:noteToEdit.id,
          ...input,
        });
      } else {
        const response = await axios.post("/api/notes", {
          ...input,
        });
      }
      form.reset();
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again");
      throw Error("Status Code: 400");
    }
  }

  async function deleteNote() {
      if(!noteToEdit) return;
      setDeleteInProgress(true);
      try {
        const response=await axios.delete("/api/notes",{
          data:{
            id:noteToEdit.id
          }
        });
        form.reset();
        router.refresh();
        setOpen(false);
      } catch(error) {
        console.error(error);
        alert("Something went wrong. Please try again");
      } finally {
        setDeleteInProgress(false);
      }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{noteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note title</FormLabel>
                  <Input placeholder="Note title" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Content</FormLabel>
                  <Textarea placeholder="Note content" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-1 sm:gap-0">
              {noteToEdit && (
                 <LoadingButton
                 variant="destructive"
                 loading={deleteInProgress}
                 disabled={form.formState.isSubmitting}
                 onClick={deleteNote}
                 type="button"
               >
                 Delete note
               </LoadingButton>
              )}
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={deleteInProgress}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditNoteDialog;
