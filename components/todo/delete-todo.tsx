"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function DeleteTodo(todo: Todo) {
  const [open, setOpen] = useState(false);
  const [titleToDelete, setTitleToDelete] = useState("");
  const [enableDelete, setEnableDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (titleToDelete === todo.title) {
      setEnableDelete(true);
    } else {
      setEnableDelete(false);
    }
  }, [titleToDelete]);

  const deleteTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", todo.id);

    if (error) {
      console.error("Error deleting todo", error);
    }
    setOpen(false);
    router.refresh();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="px-2.5">
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this todo item? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm font-small mt-2">
          Type the todo title: <b>"{todo.title}"</b> to delete it
        </p>
        <Input
          type="text"
          value={titleToDelete}
          onChange={(e) => setTitleToDelete(e.target.value)}
          placeholder="Type the todo title to delete"
          className="w-full mt-1"
          autoFocus
        />
        <DialogFooter>
          {enableDelete ? (
            <Button onClick={deleteTodo} className="w-full">
              Delete todo
            </Button>
          ) : (
            <Button disabled className="w-full">
              Delete todo
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
