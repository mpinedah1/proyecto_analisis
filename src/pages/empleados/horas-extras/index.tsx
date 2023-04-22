import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import HorasExtrasForm from 'components/Empleados/horas';
import { IHoraExtra } from 'definitions/IHoraExtra';
import Layout from 'Layouts';
import { firestore } from 'utilities/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useRouter } from 'next/router';
import { Timestamp } from '@firebase/firestore';
import { IEmpleado } from 'definitions/IEmpleado';
import { async } from '@firebase/util';
import TablaSelectable from 'components/TabaSelectable';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: string }) => row.id,
    sortable: true,
  },
  {
    name: 'ID Empleado',
    selector: (row: { empleado: string }) => row.empleado,
    sortable: true,
  },
  // {
  //   name: 'ID Autorizacion',
  //   selector: (row: { id_autorizacion: any }) => row.id_autorizacion,
  //   sortable: true,
  // },
  {
    name: 'Fecha',
    selector: (row: { fecha: string }) => row.fecha,
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: string }) => row.descripcion,
    sortable: true,
  },
  {
    name: 'Horas trabajadas',
    selector: (row: { horas_trabajadas: string }) => row.horas_trabajadas,
    sortable: true,
  },
];
const HorasExtras: React.FC<IPlainObject> = ({ horas, empleados }) => {
  const [fecha, setFecha] = useState(new Date());
  const [formulario, setFormulario] = useState({
    descripcion: '',
    horas_trabajadas: '',
    fecha: '',
    empleado: '',
  });
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  // const handleChangeRows = ({ tes }) => {
  //   setSelectedRows(tes);
  // };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

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

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('formulario', formulario);
    try {
      const docRef = await addDoc(collection(firestore, 'horas_extras'), {
        ...formulario,
        fecha: Timestamp.fromDate(fecha),
      });
      console.log('Documento escrito correctamente. ID del documento:', docRef.id);
      router.reload();
    } catch (error) {
      console.error('Error al escribir el documento: ', error);
    }
  };

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
                  empleados={empleados}
                  handleSubmit={handleSubmit}
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
                <TablaSelectable columns={columns} data={horas} handleClearRows={handleClearRows} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export async function getStaticProps() {
  const empleados: IEmpleado[] = [];
  const horas: IHoraExtra[] = [];

  try {
    const querySnapshot = await getDocs(collection(firestore, 'horas_extras'));
    querySnapshot.forEach((doc) => {
      const hora_extra: IHoraExtra = {
        id: doc.id,
        descripcion: doc.data().descripcion,
        horas_trabajadas: doc.data().horas_trabajadas,
        fecha: doc.data().fecha.toDate().toISOString(),
        empleado: doc.data().empleado || '',
      };
      horas.push(hora_extra);
    });
  } catch (error) {
    console.error('Error al leer la colección horas extras ', error);
  }

  try {
    const querySnapshot = await getDocs(collection(firestore, 'empleados'));
    querySnapshot.forEach((doc) => {
      const empleado: IEmpleado = {
        id: doc.id,
        nombres: doc.data().nombres,
        apellidos: doc.data().apellidos,
      };
      empleados.push(empleado);
    });
  } catch (error) {
    console.error('Error al leer la colección empleados', error);
  }

  return { props: { horas, empleados } };
}

export default HorasExtras;
