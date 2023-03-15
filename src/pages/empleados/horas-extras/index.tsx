import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import HorasExtrasForm from 'components/Empleados/horas';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'ID Autorizacion',
    selector: (row: { id_autorizacion: any }) => row.id_autorizacion,
    sortable: true,
  },
  {
    name: 'Fecha',
    selector: (row: { fecha: any }) => row.fecha,
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: any }) => row.descripcion,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    id_autorizacion: 123,
    fecha: '10/10/2023',
    descripcion: 'Lorem ipsum',
  },
];

const HorasExtras = () => {
  const miFuncion = () => {
    console.log('hola mundo');
  };
  return (
    <Layout title={'Horas Extras'}>
      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Ingresar Horas Extras</CardHeader>
              <CardBody>
                <HorasExtrasForm handleSubmit={miFuncion} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Listado Horas Extras</CardHeader>
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

export default HorasExtras;
