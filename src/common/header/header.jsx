// *******~ Import ~******** //
// React
import React, { useState } from "react";
// Assets

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

// Components
import MenuBtn from "./menubtn/menubtn";
import Contact from "../../pages/contact/contact";
// CSS
import "./css/header.scss";
// Images

// Responsive Img

// Icons
import { FaRegUserCircle } from "react-icons/fa";
// *******~ Import ~******** //

const Header = (params) => {
  // const { theme } = useContext(ThemeContext);
  const [Contactshow, setContactshow] = useState(false);
  const ContacthandleShow = () => setContactshow(true);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" fixed="top" className="main-header">
        <Container>
          <div className="logo">
            <>
              <Nav.Link as={Link} to={"/"} eventKey={0}>
                <div className="name">CustomerLab</div>
              </Nav.Link>
            </>
          </div>
          <MenuBtn />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <button className="get-btn" href="/" onClick={ContacthandleShow}>
                <FaRegUserCircle /> Contact Me
                <span></span>
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Contact Contactshow={Contactshow} setContactshow={setContactshow} />
    </>
  );
};
export default Header;
