// *******~ Import ~******** //
//? React

import React from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//? Components
//? CSS
import "./footer.scss";
//? Images

//? JSON File

//? Icons
import { IoHeart } from "react-icons/io5";

// *******~ Import ~******** //

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <section className="copy-right">
          <Container>
            <Row>
              <Col xxl={12}>
                <p>
                  &copy; {new Date().getFullYear()}, Made With <IoHeart /> by{" "}
                  <a
                    title="linkedin"
                    href="https://www.linkedin.com/in/ashokchinnaiyan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ashok C
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </footer>
    </>
  );
};
export default Footer;
