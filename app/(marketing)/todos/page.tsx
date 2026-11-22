// app/(marketing)/todos/page.tsx  ->  /todos
// Server Component: fetches the data ONCE, on the server, then hands it to the
// interactive TodoList Client Component as a prop. The browser never calls the API.
import TodoList from "@/components/TodoList";
import type { Todo } from "@/lib/todos";

export default async function TodosPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  const todos: Todo[] = await response.json();
  console.log(`[TodosPage] fetched ${todos.length} todos on the server`);

  return (
    <section style={{ maxWidth: "600px" }}>
      <h1>Todos</h1>
      {/* Server -> Client: the data is serialised into the page as props */}
      <TodoList initialTodos={todos} />
    </section>
  );
}
