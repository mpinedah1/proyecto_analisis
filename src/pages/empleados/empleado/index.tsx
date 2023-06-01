// Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import EmpleadosForm from 'components/Empleados/empleado';
import columns from './columns';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import CustomSpinner from 'components/CustomSpinner';

// Definitions
import { IPlainObject } from 'definitions/IPlainObjects';
import { ILiquidaciones } from 'definitions/ILiquidaciones';

// Hooks
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';

const Liquidaciones: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<ILiquidaciones>();

  // Traer listado de horas extras
  const { data: dataLiquidaciones, loading: loadingLiquidaciones } = useFirestoreCollection('empleados');

  // Traer listado de empleados
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  // Guardar documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('empleados', formulario);

  // Borrar Documento
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } =
    useFirestoreDeleteDocument('empleados');

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: any) => {
    const empleado = event.label;
    setFormulario({ ...formulario, empleado: empleado });
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
    <Layout title={'Mantenimiento de empleados'}>
      <Row>
        <Col>
          <Container>
            <h1>Empleados</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Empleados</CardHeader>
              <CardBody>
                {!loadingEmpleados ? (
                  <EmpleadosForm
                    empleados={dataEmpleados}
                    handleSubmit={handleSubmitAddDocument}
                    handleChange={handleChange}
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
              <CardHeader>Listado de empleados</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataLiquidaciones} loading={loadingLiquidaciones} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Liquidaciones;
