// In-memory tasks "database". It only accepts already-validated input.
import type { CreateTaskInput } from "./schemas";

export type Task = CreateTaskInput & { id: string; done: boolean };

const tasks: Task[] = [];
let nextId = 1;

export function listTasks(): Task[] {
  return tasks;
}

export function insertTask(input: CreateTaskInput): Task {
  const task: Task = { id: String(nextId++), done: false, ...input };
  tasks.push(task);
  return task;
}
