import { Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function LaborantLayout(){
    return (
    <div>
        <div>          
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Report Managment System Laborant</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                    <Nav.Link href="reportAdd">Report add</Nav.Link>
                    <Nav.Link href="reports">Report List</Nav.Link>
                    <Nav.Link href="/login">logout</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        <div><Outlet/></div>
    </div>
    )
}