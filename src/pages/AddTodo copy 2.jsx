import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, FormCheck } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

async function fetchExerciseData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
  );
  const data = await response.json();
  return data;
}

export default function AddTodo() {
  const [exerciseData, setExerciseData] = useState([]);
  const [button, setButton] = useState(false);

  function test() {
    setButton(true);
  }

  useEffect(() => {
    if (button) {
      fetchExerciseData().then((data) => setExerciseData(data));
      console.log(exerciseData);
      setButton(false);
    }
  }, [button, exerciseData]);

  const Test = () => {
    return exerciseData.map((exercise) => {
      const [toggle, setToggle] = useState(false);
      const img1 = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`;
      const img2 = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[1]}`;

      function handleClick() {
        setToggle(!toggle);
      }
      return (
        <div key={exercise.id}>
          <img src={toggle ? img1 : img2} alt="" onClick={handleClick} />
          <h1>{exercise.name}</h1>
        </div>
      );
    });
  };

  return (
    <>
      <Button onClick={test}>Test</Button>
      <Test />
    </>
  );
}

// export default function AddTodo() {
//     const todos = useContext(TodoContext).todos
//     const setTodos = useContext(TodoContext).setTodos
//     const currentUser = useContext(AuthContext).currentUser
//     const [title, setTitle] = useState("")
//     const [description, setDescription] = useState("")
//     const [completed, setCompleted] = useState(false)
//     const navigate = useNavigate()

//     function submit(event) {
//         event.preventDefault()
//         setTodos([...todos, { id: Date.now(), userId: currentUser[0], title, description, completed }])
//         navigate("/dashboard")
//     }

//     return (
//         <Container>
//             <Form onSubmit={submit}>
//                 <Form.Group>
//                     <Form.Label>Title</Form.Label>
//                     <Form.Control value={title} type='text' onChange={(event) => setTitle(event.target.value)} required />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control value={description} type='text' as={'textarea'} rows={3} onChange={(event) => setDescription(event.target.value)} required />
//                 </Form.Group>
//                 <FormCheck checked={completed} label='Mark Completed' onChange={(event) => setCompleted(event.target.checked)}></FormCheck>
//                 <Button type='submit'>Submit</Button>
//             </Form>
//         </Container>
//     )
// }
