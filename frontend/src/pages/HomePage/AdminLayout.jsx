import { Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function HomeLayout(){
    return (
    <div>
        <div>          
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Report Managment System Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                <Nav.Link href="list">Aktif Hesaplar</Nav.Link>
                <Nav.Link href="unconfirmed">Onay Bekleyenler</Nav.Link>
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