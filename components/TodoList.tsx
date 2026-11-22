"use client";

// Client Component: receives data as a prop and only handles interactivity
// (filtering + toggling) with local state. It never fetches.
import { useState } from "react";
import type { Todo } from "@/lib/todos";

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [showCompleted, setShowCompleted] = useState(true);

  const filtered = todos.filter((todo) => showCompleted || !todo.completed);

  const handleToggle = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} />{" "}
        Show completed
      </label>
      <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
        {filtered.map((todo) => (
          <li key={todo.id} style={{ padding: "0.5rem", textDecoration: todo.completed ? "line-through" : "none" }}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} /> {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
