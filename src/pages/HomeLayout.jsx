import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'


export default function DashboardLayout() {
    const navigate = useNavigate()

    function Login() {
        navigate('/login')
    }

    function Signup() {
        navigate('/signup')
    }

    return (
        <div >
            <Navbar className='pt-3'>
                <Container className='px-5' fluid>
                    <Navbar.Brand href='/' className="d-flex align-items-center gap-1">
                        <img src="src/images/logo.png" alt="" style={{ width: "30px" }} />
                        <strong style={{ width: "auto", height: "30px" }}>GrindTrack</strong>
                    </Navbar.Brand>
                    <Container className=''>
                        {/* <Button onClick={Signup}>Sign Up</Button>
                        <Button onClick={Login}>Login</Button> */}
                    </Container>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    )
}
