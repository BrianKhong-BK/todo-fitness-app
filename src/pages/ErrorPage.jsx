import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function ErrorPage() {
    const navigate = useNavigate()

    function toHome() {
        navigate("/")
    }

    return (
        <Container className="d-flex flex-column align-items-center" style={{ marginTop: "200px" }}>
            <span style={{ fontSize: "200px", color: "#dc3545" }}>404</span>
            <h1>Opps! Page Not Found</h1>
            <Button variant="danger" className="my-3" onClick={toHome}>Back to home</Button>
        </Container>
    )
}