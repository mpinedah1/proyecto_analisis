import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import DeduccionesForm from 'components/Deducciones';
import Layout from 'Layouts';

const Deducciones = () => {
  return (
    <Layout title={'Deducciones'}>
      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Ingresar deducciones</CardHeader>
              <CardBody>
                <DeduccionesForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Deducciones;
