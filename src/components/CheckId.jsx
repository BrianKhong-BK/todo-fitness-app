import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { TodoContext } from "../contexts/TodoContext";

//To check if workout plan ID exist if false navigate to error page

export default function CheckId({ children }) {
  const todos = useContext(TodoContext).todos;
  const id = parseInt(useParams().id);
  const currentTodo = todos.filter((todo) => todo.id === id)[0];

  if (!currentTodo) {
    return <Navigate to="/error" replace />;
  }

  return children;
}
