type Todo = {
  id: string;
  title: string;
  priority: number;
  created_at: string;
  is_done: boolean;
  done_at: string | null;
};

type TodoContextType = {
  todos: Todo[];
  setTodos: (todos: React.SetStateAction<Todo[]>) => void;
};
