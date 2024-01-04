// *******~ Import ~******** //
// React
// Assets
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// Components
// CSS
import "./404.scss";
// Images
// Icons
// *******~ Import ~******** //
export default function NotFound(second) {
  return (
    <>
      <section className="not-found">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <h3>404</h3>
              <p>Page Not Found</p>
              <Link to="/">Got to Home</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
