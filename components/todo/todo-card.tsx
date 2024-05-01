"use client";
import EditTodo from "./edit-todo";
import DeleteTodo from "./delete-todo";

export default function TodoCard(todo: Todo) {
  return (
    <div className="bg-white border rounded-lg p-4 m-1 w-full flex items-center ">
      <div>
        <h2 className="text-sm font-medium">{todo.title}</h2>
      </div>
      <div className="ml-auto">
        <span
          className={`px-2 py-1 ${
            todo.priority === 1
              ? "bg-red-100 text-red-800"
              : todo.priority === 2
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          } text-gray-800 text-xs rounded-xl m-2 mt-0`}
        >
          {todo.priority === 1
            ? "high"
            : todo.priority === 2
            ? "medium"
            : "low"}
        </span>
        <EditTodo {...todo} />
        <DeleteTodo {...todo} />
      </div>
    </div>
  );
}
