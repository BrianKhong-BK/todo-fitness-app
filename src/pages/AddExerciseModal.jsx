import { useEffect, useState } from "react";
import {
  Col,
  Modal,
  Row,
  Image,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";

async function fetchExerciseData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
  );
  const data = await response.json();
  return data;
}

export default function AddExerciseModal({
  show,
  handleClose,
  exercises,
  setExercises,
}) {
  const [exerciseData, setExerciseData] = useState([]);
  const [search, setSearch] = useState("");
  const [reps, setReps] = useState("");
  const [viewCount, setViewCount] = useState(10);
  const [warning, setWarning] = useState(false);

  function viewMore() {
    setViewCount((prev) => prev + 10);
  }

  const filterExerciseData = exerciseData.filter((exercise) =>
    search ? exercise.name.toLowerCase().includes(search) : exercise
  );

  function ExerciseList() {
    return filterExerciseData.slice(0, viewCount).map((exercise) => {
      function addExercise() {
        if (reps) {
          const newExercise = {
            id: Date.now(),
            name: exercise.name,
            image: exercise.images[0],
            reps: reps,
            completed: false,
          };
          setExercises([...exercises, newExercise]);
          setWarning(false);
        } else {
          setWarning(true);
        }
      }

      return (
        <div
          className="d-flex flex-column align-items-center justify-content-center "
          key={exercise.id}
        >
          <Container className="d-flex align-items-center justify-content-between border mt-3 p-2 rounded">
            {exercise.name}
            <Button onClick={addExercise}>
              <i className="bi bi-plus"></i> Add
            </Button>
          </Container>
          {filterExerciseData.indexOf(exercise) + 1 >= viewCount && (
            <Button className="mt-3" onClick={viewMore}>
              Load more
            </Button>
          )}
        </div>
      );
    });
  }

  useEffect(() => {
    if (show) {
      fetchExerciseData().then((data) => setExerciseData(data));
      setViewCount(10);
    } else {
      setSearch("");
      setReps("");
      setWarning(false);
    }
  }, [show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Exercise List</Modal.Header>
        <Container className="mt-3">
          <Form>
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Number of reps{" "}
                {warning && (
                  <span style={{ color: "red" }}>
                    - Please enter reps number
                  </span>
                )}
              </Form.Label>
              <Form.Control
                type="number"
                value={reps}
                onChange={(event) => setReps(event.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Container>
        <Modal.Body style={{ height: "70vh", overflowY: "auto" }}>
          <ExerciseList />
        </Modal.Body>
      </Modal>
    </div>
  );
}
