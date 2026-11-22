// Plain, serialisable shape: numbers, strings and booleans can cross the
// server -> client boundary as props. Functions, class instances, Maps/Sets,
// Symbols etc. cannot (Dates are only safe as strings).
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
