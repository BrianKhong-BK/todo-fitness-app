import { Button, Container, Form, FormCheck } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTodo() {
  const todos = useContext(TodoContext).todos;
  const setTodos = useContext(TodoContext).setTodos;
  const navigate = useNavigate();
  const id = parseInt(useParams().id);
  const currentTodo = todos.filter((todo) => todo.id === id)[0];
  const userId = currentTodo.userId;
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description);
  const [completed, setCompleted] = useState(currentTodo.completed);

  function submit(event) {
    event.preventDefault();

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { id, userId, title, description, completed };
      }

      return todo;
    });
    setTodos(updatedTodos);
    navigate("/dashboard");
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            type="text"
            as={"textarea"}
            rows={3}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </Form.Group>
        <FormCheck
          checked={completed}
          label="Mark Completed"
          onChange={(event) => setCompleted(event.target.checked)}
        ></FormCheck>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
