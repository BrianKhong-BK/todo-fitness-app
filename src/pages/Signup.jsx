import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Col, Row, Image } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import logo from "../images/logo.png";

export default function Signup() {
  const users = useContext(UserContext).users;
  const setUsers = useContext(UserContext).setUsers;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const emailExist = users.some((user) => user.email === email);
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    if (!emailExist) {
      setUsers([...users, { id: Date.now(), email, username, password }]);
      navigate("/login");
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
        <h1 className="my-3">Create your account</h1>
        <Form onSubmit={submit} style={{ width: "100%" }}>
          <Form.Group className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email.trim()}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
            {emailExist && (
              <p className="mt-2" style={{ color: "red" }}>
                Email existed
              </p>
            )}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(event) => setUserName(event.target.value.trim())}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(event) => setPassword(event.target.value.trim())}
              type="password"
              required
            />
          </Form.Group>
          <Button
            variant="danger"
            className="mt-5 my-3"
            type="submit"
            style={{ width: "100%" }}
          >
            Sign Up
          </Button>
          <a href="/login" id="toLogin">
            Already have an account?
          </a>
        </Form>
      </Container>
    </div>
  );
}
