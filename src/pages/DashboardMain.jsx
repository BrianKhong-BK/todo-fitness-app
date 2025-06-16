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
  const userTodos = todos.filter((todo) => todo.userId === currentUserId);

  function CardGroup() {
    return userTodos.map((todo) => {
      function deleteTodo() {
        setTodos((prevTodos) =>
          prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
        );
      }

      return (
        <Col md={4} key={todo.id} className="mt-3">
          <Card>
            <Card.Header>
              <h5>{todo.title} </h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Number of exercises: {todo.exercises.length}
              </Card.Text>
              <Container>
                <Button
                  variant="success"
                  href={`dashboard/view/${todo.id}`}
                  className="me-2 mb-2"
                >
                  <i className="bi bi-play-fill"></i> Start
                </Button>
                <Button
                  href={`dashboard/edit/${todo.id}`}
                  className="me-2 mb-2"
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={deleteTodo}
                  className="me-2 mb-2"
                >
                  <i className="bi bi-trash-fill"></i> Delete
                </Button>
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
        {userTodos.length === 0 && (
          <Container
            className="mt-3 d-flex flex-column align-items-center justify-content-center"
            style={{ opacity: 0.5 }}
          >
            <i className="bi bi-folder-plus" style={{ fontSize: "100px" }}></i>
            <h5>There Are No Plan Yet</h5>
            <p>Click on add new plan to get started</p>
          </Container>
        )}
        <Row>
          <CardGroup />
        </Row>
      </Container>
    </div>
  );
}
