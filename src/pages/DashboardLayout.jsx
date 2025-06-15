import { useContext } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function DashboardLayout() {
  const setCurrentUser = useContext(AuthContext).setCurrentUser;

  function logout() {
    setCurrentUser(null);
  }
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="/dashboard">
            <i className="bi bi-house"></i> | Home
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard/add">
              <i className="bi bi-plus-square"></i> | Add New Plan
            </Nav.Link>
          </Nav>
          <Button onClick={logout}>
            <i className="bi bi-box-arrow-right"></i> | Logout
          </Button>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}
