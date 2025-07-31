import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../images/logo.png";

export default function Login() {
  const users = useContext(UserContext).users;
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const checkUser = users.some((user) => user.email === email);
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    if (checkUser) {
      const filterUser = users.filter((user) => user.email === email)[0];
      setError("");
      if (filterUser.password === password) {
        setError("");
        auth.setCurrentUser([filterUser.id, filterUser.username]);
        navigate("/dashboard");
      } else {
        setError(2);
      }
    } else {
      setError(1);
    }
  }

  return (
    <div
      style={{ padding: "60px", backgroundColor: "#990000", height: "100vh" }}
    >
      <Container
        className="d-flex flex-column justify-content-center align-items-center p-5"
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <img src={logo} alt="" style={{ width: "100px" }} />
        <h1 className="my-3">Login to your account</h1>
        <Form onSubmit={submit} style={{ width: "100%" }}>
          <Form.Group className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {error === 1 && (
              <p className="mt-2" style={{ color: "red" }}>
                Email not found
              </p>
            )}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error === 2 && (
              <p className="mt-2" style={{ color: "red" }}>
                Password is incorrect
              </p>
            )}
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className="mt-5 my-3"
            style={{ width: "100%" }}
          >
            Log In
          </Button>
          <p>
            Need an account?{" "}
            <a href="/signup" id="toSignup">
              Register
            </a>
          </p>
        </Form>
      </Container>
    </div>
  );
}
