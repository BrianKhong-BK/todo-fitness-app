import { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  Col,
  Row,
  Card,
  Image,
} from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AddExerciseModal from "./AddExerciseModal";

export default function AddTodo() {
  const todos = useContext(TodoContext).todos;
  const setTodos = useContext(TodoContext).setTodos;
  const currentUser = useContext(AuthContext).currentUser;
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function submit(event) {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: Date.now(),
        userId: currentUser[0],
        title,
        exercises,
      },
    ]);
    navigate("/dashboard");
  }

  function CardGroup() {
    return exercises.map((exercise, index) => {
      function deleteExercise() {
        const updatedExercises = exercises.filter((e) => e.id !== exercise.id);
        setExercises(updatedExercises);
      }
      return (
        <Col md={4} key={index} className="mt-3">
          <Card>
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
              <Button variant="danger" onClick={deleteExercise}>
                <i className="bi bi-trash-fill"></i> | Remove
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
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
        <div className="mt-3 d-flex flex-row align-items-center gap-3">
          <Button onClick={openModal}>
            <i className="bi bi-plus"></i> | Add exercise
          </Button>
          <Button type="submit" variant="success">
            <i className="bi bi-save"></i> | Save plan
          </Button>
        </div>
        <AddExerciseModal
          show={showModal}
          handleClose={closeModal}
          setExercises={setExercises}
          exercises={exercises}
        />
        <Row className="mt-3">
          <CardGroup />
        </Row>
      </Form>
    </Container>
  );
}
