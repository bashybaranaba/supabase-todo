"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function createTodo() {
    setLoading(true);
    const { data, error } = await supabase.from("todos").insert({
      title: title,
      priority: priority === "low" ? 3 : priority === "medium" ? 2 : 1,
      is_done: false,
      created_at: new Date().toISOString(),
      done_at: null,
    });

    if (error) {
      console.error("Error creating todo", error);
    } else {
      setTitle("");
    }
    setLoading(false);
    router.refresh();
  }

  return (
    <>
      <div className="flex mb-3">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new todo"
          className="w-full mt-1 ml-1 mr-1"
          autoFocus
        />
        <Select onValueChange={(value) => setPriority(value)}>
          <SelectTrigger className="w-[150px] mt-1 ml-1">
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
        {title && priority ? (
          loading ? (
            <Button disabled className="ml-2">
              <Loader2 className="w-4 h-4 ml-2 m-1 animate-spin" />
            </Button>
          ) : (
            <Button onClick={createTodo} className="ml-2 m-1">
              Create new todo
            </Button>
          )
        ) : (
          <Button disabled className="ml-2 m-1">
            Create new todo
          </Button>
        )}
      </div>
    </>
  );
}
