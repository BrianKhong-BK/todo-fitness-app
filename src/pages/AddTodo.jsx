import { useContext, useState } from "react";
import { Button, Container, Form, FormCheck } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const todos = useContext(TodoContext).todos;
  const setTodos = useContext(TodoContext).setTodos;
  const currentUser = useContext(AuthContext).currentUser;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    setTodos([
      ...todos,
      { id: Date.now(), userId: currentUser[0], title, description, completed },
    ]);
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
