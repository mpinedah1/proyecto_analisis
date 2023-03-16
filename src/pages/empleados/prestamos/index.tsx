import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import PrestamosForm from 'components/Empleados/prestamos';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Entidad',
    selector: (row: { entidad: any }) => row.entidad,
    sortable: true,
  },
  {
    name: 'Cuotas',
    selector: (row: { cuotas: any }) => row.cuotas,
    sortable: true,
  },
  {
    name: 'Monto',
    selector: (row: { monto: any }) => row.monto,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    entidad: 'Banco Industrial',
    cuotas: 12,
    monto: 5000,
  },
];

const bancos = [
  { value: 'bi', label: 'Banco Industrial' },
  { value: 'banrural', label: 'Banrural' },
  { value: 'bac', label: 'Bac' },
];

const Prestamos = () => {
  const miFuncion = () => {
    console.log('hola mundo');
  };
  return (
    <Layout title={'Horas Extras'}>
      <Row>
        <Col>
          <Container>
            <h1>Prestamos</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Prestaos</CardHeader>
              <CardBody>
                <PrestamosForm handleSubmit={miFuncion} bancos={bancos} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Listado de Prestamos</CardHeader>
              <CardBody>
                <Tabla columns={columns} data={data} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Prestamos;
