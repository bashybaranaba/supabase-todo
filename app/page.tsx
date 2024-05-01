import CreateTodo from "@/components/todo/create-todo";
import TodoCard from "@/components/todo/todo-card";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;
export default async function Home() {
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("priority", { ascending: true });
  if (error) console.error("Error fetching todos", error);

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <p className="text-lg font-semibold">Todos App</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-2xl font-semibold mb-4">My todos</h1>
        <div className="w-[40%]">
          <CreateTodo />
          {todos &&
            todos.map((todo: Todo) => <TodoCard key={todo.id} {...todo} />)}
        </div>
      </div>
    </div>
  );
}
