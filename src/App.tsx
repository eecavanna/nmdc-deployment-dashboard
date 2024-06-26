import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ThemeSelector from "./components/ThemeSelector.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServicesTable from "./components/ServicesTable/ServicesTable.tsx";
import CronJobsTable from "./components/CronJobsTable/CronJobsTable.tsx";

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

const now = new Date();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className={"py-5"}>
        <Row className={"mb-5 align-items-center"}>
          <Col>
            <h1>Deployment Dashboard</h1>
          </Col>
          <Col className={"text-end flex-grow-0"}>
            <ThemeSelector />
          </Col>
        </Row>
        <Row className={"mb-3"}>
          <Col>
            <h2 className={"mb-3"}>Services</h2>
            <ServicesTable />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className={"mb-3"}>CronJobs</h2>
            <CronJobsTable baseDate={now} />
          </Col>
        </Row>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
