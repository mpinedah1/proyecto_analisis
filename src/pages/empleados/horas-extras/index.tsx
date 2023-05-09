import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import HorasExtrasForm from 'components/Empleados/horas';
import { IHoraExtra } from 'definitions/IHoraExtra';
import Layout from 'Layouts';
import { firestore } from 'utilities/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useRouter } from 'next/router';
import { deleteDoc, doc, Timestamp } from '@firebase/firestore';
import { IEmpleado } from 'definitions/IEmpleado';
import TablaSelectable from 'components/TabaSelectable';
import columns from './columns';
import Tabla from 'components/Tabla';
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';

const HorasExtras: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [fecha, setFecha] = useState(new Date());
  const [formulario, setFormulario] = useState<IHoraExtra>();

  const { data: dataHorasExtras, loading: loadingHorasExtras } = useFirestoreCollection('horas_extras');
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('horas_extras', formulario);

  // Borrar Documento
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } =
    useFirestoreDeleteDocument('horas_extras');

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event', event);

    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: any) => {
    const empleado = event.label;
    setFormulario({ ...formulario, empleado: empleado });
  };

  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fech = new Date(event.target.value);
    setFecha(fech);
  };

  // const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   console.log('formulario', formulario);
  //   try {
  //     const docRef = await addDoc(collection(firestore, 'horas_extras'), {
  //       ...formulario,
  //       fecha: Timestamp.fromDate(fecha),
  //     });
  //     console.log('Documento escrito correctamente. ID del documento:', docRef.id);
  //     router.reload();
  //   } catch (error) {
  //     console.error('Error al escribir el documento: ', error);
  //   }
  // };

  // const { data, loading, errorAdd, handleSubmitAdd } = useFirestoreAddDocument(
  //   "horas_extras",
  //   { ...formulario, fecha: Timestamp.fromDate(fecha) }
  // );

  // const eliminar = async (id: any) => {
  //   console.log('idid', id);
  //   // return;
  //   try {
  //     await deleteDoc(doc(firestore, 'horas_extras', id));
  //     console.log('Documento borrado correctamente. ID del documento: ', id);
  //     router.reload();
  //   } catch (error) {
  //     console.error('Error al eleiminar el documento: ', error);
  //   }
  // };

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

  return (
    <Layout title={'Horas Extras'}>
      <Row>
        <Col>
          <Container>
            <h1>Horas Extras</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Horas Extras</CardHeader>
              <CardBody>
                <HorasExtrasForm
                  empleados={dataEmpleados}
                  handleSubmit={handleSubmitAddDocument}
                  handleChange={handleChange}
                  handleFechaChange={handleFechaChange}
                  handleSelectChange={handleSelectChange}
                />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado Horas Extras</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataHorasExtras} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

// export async function getStaticProps() {
//   const empleados: IEmpleado[] = [];
//   const horas: IHoraExtra[] = [];

//   try {
//     const querySnapshot = await getDocs(collection(firestore, 'horas_extras'));
//     querySnapshot.forEach((doc) => {
//       const hora_extra: IHoraExtra = {
//         id: doc.id,
//         descripcion: doc.data().descripcion,
//         horas_trabajadas: doc.data().horas_trabajadas,
//         fecha: doc.data().fecha.toDate().toISOString(),
//         empleado: doc.data().empleado || '',
//       };
//       horas.push(hora_extra);
//     });
//   } catch (error) {
//     console.error('Error al leer la colección horas extras ', error);
//   }

//   try {
//     const querySnapshot = await getDocs(collection(firestore, 'empleados'));
//     querySnapshot.forEach((doc) => {
//       const empleado: IEmpleado = {
//         id: doc.id,
//         nombres: doc.data().nombres,
//         apellidos: doc.data().apellidos,
//       };
//       empleados.push(empleado);
//     });
//   } catch (error) {
//     console.error('Error al leer la colección empleados', error);
//   }

//   return { props: { horas, empleados } };
// }

export default HorasExtras;
