import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuthStore } from '../../../auth/store/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <Container className="mt-4">
      <h2>Bienvenido/a a la ABM Genérica</h2>
      <p className="text-muted">Sesión iniciada como: <strong>{user?.email}</strong></p>

      <Row className="mt-4">
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Gestión de Usuarios</Card.Title>
              <Card.Text>
                Alta, baja y modificación de usuarios registrados.
              </Card.Text>
              <a href="/usuarios" className="btn btn-primary">Ir a Usuarios</a>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Gestión de Productos</Card.Title>
              <Card.Text>
                Módulo de ejemplo para gestionar productos (puedes crearlo luego).
              </Card.Text>
              <button disabled className="btn btn-outline-secondary">Próximamente</button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Reportes</Card.Title>
              <Card.Text>
                Acceso a reportes y análisis (puedes integrarlo más adelante).
              </Card.Text>
              <button disabled className="btn btn-outline-secondary">Próximamente</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
