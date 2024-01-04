// *******~ Import ~******** //
//? React
import React from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//? Components
import SegmentForm from "./segment-form";
//? CSS
import "./css/segment.scss";
//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //

const Segment = () => {
  return (
    <section className="segment">
      <Container>
        <Row>
          <Col xxl={12}>
            <SegmentForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Segment;
