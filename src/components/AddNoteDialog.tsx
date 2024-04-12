import { createNoteSchema, CreateNoteSchema } from "@/lib/validation/note";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./ui/loading-button";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AddNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddNoteDialog: FC<AddNoteDialogProps> = ({ open, setOpen }) => {
  const router=useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues:{
        title:"",
        content:""
    }
  });

  async function onSubmit(input: CreateNoteSchema) {
    try {
      const response=await axios.post("/api/notes",{
        ...input
      });
      form.reset();
      router.refresh();
      setOpen(false);

    } catch(error) {
      console.error(error);
      alert("Something went wrong. Please try again");
      throw Error("Status Code: 400");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Note title</FormLabel>
                            <Input placeholder="Note title" {...field} />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Note Content</FormLabel>
                            <Textarea placeholder="Note content" {...field} />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <LoadingButton type="submit" loading={form.formState.isSubmitting} className="w-full">
                        Submit
                    </LoadingButton>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
