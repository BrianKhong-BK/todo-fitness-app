import { useContext, useState, useEffect } from "react";
import { Button, Container, Col, Row, Card, Image } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useParams } from "react-router-dom";

export default function ViewTodo() {
  const todos = useContext(TodoContext).todos;
  const setTodos = useContext(TodoContext).setTodos;
  const id = parseInt(useParams().id);
  const currentTodo = todos.filter((todo) => todo.id === id)[0];
  const [exercises, setExercises] = useState(currentTodo.exercises);

  useEffect(() => {
    const updatedTodo = todos.map((todo) =>
      todo.id === currentTodo.id ? { ...todo, exercises: exercises } : todo
    );

    setTodos(updatedTodo);
  }, [exercises]);

  function reset() {
    const resetCompleted = exercises.map((exercise) => {
      return { ...exercise, completed: false };
    });
    setExercises(resetCompleted);
  }

  function CardGroup() {
    return exercises.map((exercise, index) => {
      function completedBtn() {
        const updatedCompleted = exercises.map((e) =>
          e.id === exercise.id ? { ...e, completed: true } : e
        );
        setExercises(updatedCompleted);
      }

      function notCompletedBtn() {
        const updatedCompleted = exercises.map((e) =>
          e.id === exercise.id ? { ...e, completed: false } : e
        );
        setExercises(updatedCompleted);
      }

      const bg = exercise.completed ? "success" : "danger";
      return (
        <Col md={4} key={index} className="mt-3">
          <Card bg={bg}>
            <Card.Header>
              <h5>{exercise.name}</h5>
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title
                className="d-flex align-items-center justify-content-center"
                style={{ height: "250px", overflow: "hidden" }}
              >
                <Image
                  src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.image}`}
                  style={{ maxHeight: "100%", objectFit: "contain" }}
                  fluid
                />
              </Card.Title>
              <h3 className="mb-3">{exercise.reps} reps</h3>
              <Container
                className="px-3 py-2 "
                style={{ backgroundColor: "white", borderRadius: "5px" }}
              >
                <Row>
                  <Col xs={6}>
                    <Button
                      variant="success"
                      className="w-100"
                      onClick={completedBtn}
                    >
                      <i className="bi bi-check"></i>
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={notCompletedBtn}
                    >
                      <i className="bi bi-x"></i>
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  return (
    <Container>
      <div className="d-flex align-items-center gap-4">
        <h1>{currentTodo.title}</h1>
        <Button onClick={reset}>
          <i className="bi bi-arrow-clockwise"></i> | Reset
        </Button>
      </div>
      <Row className="mt-3">
        <CardGroup />
      </Row>
    </Container>
  );
}
