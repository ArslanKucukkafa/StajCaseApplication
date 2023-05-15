import { Outlet } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "./authLayout.css";
export default function AuthLayout(){
    return (     
        <div>
            <div>          
                <Navbar fixed="top" bg="light" className="navbarStyle" >
                    <Container>
                    <Navbar.Brand href="#home">Report Managment System Auth Page</Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
            <div><Outlet/></div>
        </div>
       )
}