import { useState } from "react";
import  Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import  Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css'
import { CreateNotes } from "../ModalNotes/CreateNotes";

export const NavbarContainer = () => {
    const [refresh, setRefresh] = useState(false)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    return(
        <Navbar collapseOnSelect expand="lg"  >
                <Container>
                <Navbar.Brand as={Link} to={"/"}>Notes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"} ></Nav.Link>
                        <Button className="cssbuttons" 
                        onClick={handleShow}
                        >Create Note</Button>
                        <CreateNotes show={show} setShow={setShow} setRefresh={setRefresh}/>
                        <Nav.Link as={Link} to={"/archived"} >Archived notes</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}
