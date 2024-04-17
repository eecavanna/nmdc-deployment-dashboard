import { Col, Container, Row } from "react-bootstrap";
import { FetchProvider } from "fetch-react-hook";

function App() {
  return (
    <FetchProvider>
      <Container className={"py-5"}>
        <Row>
          <Col>
            <h1>Deployment Dashboard</h1>
          </Col>
        </Row>
      </Container>
    </FetchProvider>
  );
}

export default App;
