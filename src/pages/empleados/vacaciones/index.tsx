// Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Timestamp } from '@firebase/firestore';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import VacacionesForm from 'components/Empleados/Vacaciones';
import columns from './columns';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import CustomSpinner from 'components/CustomSpinner';

// Definitions
import { IPlainObject } from 'definitions/IPlainObjects';
import { IVacaciones } from 'definitions/IVacaciones';

// Hooks
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';

const Vacaciones: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<IVacaciones>();

  // Traer listado de horas extras
  const { data: dataVacaciones, loading: loadingVacaciones } = useFirestoreCollection('vacaciones');

  // Traer listado de empleados
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  // Guardar documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('vacaciones', formulario);

  // Borrar Documento
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } =
    useFirestoreDeleteDocument('vacaciones');

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: any) => {
    const empleado = event.label;
    setFormulario({ ...formulario, empleado: empleado });
  };

  const handleFechaIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fechaI = new Date(event.target.value);
    setFormulario({ ...formulario, fechaI: Timestamp.fromDate(fechaI) });
  };

  const handleFechaFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fechaF = new Date(event.target.value);
    setFormulario({ ...formulario, fechaF: Timestamp.fromDate(fechaF) });
  };

  const insertarBotones = async () => {
    const botones: any = {
      name: 'Actions',
      cell: (row: { id: string }) => (
        <Button status="Danger" onClick={() => handleSubmitDeleteDocument(row.id)}>
          Eliminar
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    };
    columns.push(botones);
    setTablaColumnas(columns);
  };

  useEffect(() => {
    insertarBotones();
  }, []);

  useEffect(() => {
    if (successAdd) router.reload();
  }, [successAdd]);

  return (
    <Layout title={'Mantenimiento de vacaciones'}>
      <Row>
        <Col>
          <Container>
            <h1>Vacaciones</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Vacaciones</CardHeader>
              <CardBody>
                {!loadingEmpleados ? (
                  <VacacionesForm
                    empleados={dataEmpleados}
                    handleSubmit={handleSubmitAddDocument}
                    handleChange={handleChange}
                    handleFechaIChange={handleFechaIChange}
                    handleFechaFChange={handleFechaFChange}
                    handleSelectChange={handleSelectChange}
                    loading={isLoadingAdd}
                  />
                ) : (
                  <CustomSpinner status="Primary" size="Large" padding />
                )}
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de Vacaciones</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataVacaciones} loading={loadingVacaciones} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Vacaciones;
