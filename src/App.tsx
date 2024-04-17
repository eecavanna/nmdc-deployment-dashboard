import { Col, Container, Row } from "react-bootstrap";
import { FetchProvider } from "fetch-react-hook";
import ThemeSelector from "./components/ThemeSelector.tsx";

function App() {
  return (
    <FetchProvider>
      <Container className={"py-5"}>
        <Row>
          <Col className={"text-end"}>
            <ThemeSelector />
          </Col>
        </Row>
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
