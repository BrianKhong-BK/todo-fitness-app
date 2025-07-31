import { Col, Row, Container, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cover from "../images/cover.jpg";
import logo from "../images/logo.png";

export default function HomeMain() {
  const navigate = useNavigate();

  function Login() {
    navigate("/login");
  }

  function Signup() {
    navigate("/signup");
  }

  return (
    <>
      <Navbar className="pt-3" style={{ height: "7vh" }}>
        <Container className="px-5" fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-1">
            <img src={logo} alt="" style={{ width: "30px" }} />
            <strong>GrindTrack</strong>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div
        className="pt-5"
        style={{ backgroundColor: "#990000", height: "93vh" }}
      >
        <Container
          style={{
            width: "95vw",
            height: "80vh",
            backgroundImage: `url(${cover})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "30px",
          }}
          fluid
        >
          <Container className="px-5">
            <Container style={{ height: "15vh" }} />
            <Container>
              <Row>
                <Col md={5} style={{ color: "white" }}>
                  <div>
                    <h1 style={{ fontSize: "70px" }}>
                      <span style={{ color: "#dc3545" }}>T</span>rain.
                    </h1>
                    <h1 style={{ fontSize: "70px" }}>
                      <span style={{ color: "#dc3545" }}>T</span>rack.
                    </h1>
                    <h1 style={{ fontSize: "70px" }}>
                      <span style={{ color: "#dc3545" }}>T</span>ransform.
                    </h1>
                  </div>
                  <p className="mb-5">
                    Our all-in-one fitness tracker gym app helps you monitor
                    workouts, log progress, and stay motivated with personalized
                    plans and real-time analytics
                  </p>
                  <Button
                    variant="danger"
                    className="me-3"
                    style={{
                      width: "150px",
                      padding: "15px",
                      fontSize: "20px",
                      borderRadius: "50px",
                    }}
                    onClick={Signup}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="light"
                    style={{
                      width: "150px",
                      padding: "15px",
                      fontSize: "20px",
                      borderRadius: "50px",
                    }}
                    onClick={Login}
                  >
                    Login
                  </Button>
                </Col>
              </Row>
            </Container>
          </Container>
        </Container>
      </div>
    </>
  );
}
