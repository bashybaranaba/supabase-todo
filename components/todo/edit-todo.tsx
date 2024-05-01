"use client";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function EditTodo(todo: Todo) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState(
    todo.priority === 1 ? "high" : todo.priority === 2 ? "medium" : "low"
  );

  const router = useRouter();

  const updateTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .update({
        title,
        priority: priority === "low" ? 3 : priority === "medium" ? 2 : 1,
      })
      .eq("id", todo.id);

    if (error) {
      console.error("Error updating todo", error);
    }
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="px-2.5">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo item here. Click the save button when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            defaultValue="Pedro Duarte"
            className="col-span-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select
            onValueChange={(value) => setPriority(value)}
            value={priority}
          >
            <SelectTrigger className="w-full mt-1 ml-1">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="high">high</SelectItem>
                <SelectItem value="medium">medium</SelectItem>
                <SelectItem value="low">low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={updateTodo}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
