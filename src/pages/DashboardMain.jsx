import { useContext } from "react";
import { Container, Col, Card, Row, Badge, Button } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { TodoContext } from "../contexts/TodoContext";

export default function DashboardMain() {
  const currentUser = useContext(AuthContext).currentUser;
  const todos = useContext(TodoContext).todos;
  const setTodos = useContext(TodoContext).setTodos;
  const currentUserId = currentUser[0];
  const currentUserName = currentUser[1];

  function CardGroup() {
    return todos
      .filter((todo) => todo.userId === currentUserId)
      .map((todo) => {
        function deleteTodo() {
          setTodos((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
          );
        }

        const completed = todo.completed ? "Completed" : "Not completed";
        const bg = todo.completed ? "success" : "danger";
        return (
          <Col md={4} key={todo.id} className="mt-3">
            <Card style={{ height: "200px" }}>
              <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Body>{todo.description}</Card.Body>
                <Badge bg={bg}>{completed}</Badge>
                <Container>
                  <Button href={`dashboard/edit/${todo.id}`}>Edit</Button>
                  <Button onClick={deleteTodo}>Delete</Button>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        );
      });
  }

  return (
    <div>
      <Container>
        <h1>Welcome {currentUserName}</h1>
        <Row>
          <CardGroup />
          <Col md={4} className="mt-3">
            <Card style={{ height: "200px" }}>
              <Button
                className="d-flex align-items-center justify-content-center"
                href="/dashboard/add"
                style={{ height: "200px", fontSize: "50px" }}
              >
                +
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
