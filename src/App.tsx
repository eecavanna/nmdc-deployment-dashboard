import { Col, Container, Row } from "react-bootstrap";
import ThemeSelector from "./components/ThemeSelector.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServicesTable from "./components/ServicesTable/ServicesTable.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent TanStack Query from automatically requesting fresh data when
      // the web page regains focus (e.g. switching back from other tab).
      // Reference: https://tanstack.com/query/latest/docs/framework/react/guides/window-focus-refetching
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
        <Row>
          <Col>
            <h2>Services</h2>
            <ServicesTable />
          </Col>
        </Row>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
