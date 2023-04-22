import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import PrestamosForm from 'components/Empleados/prestamos';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

//firebase
import { firestore } from 'utilities/firebase';
import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore';
import { IBanco } from 'definitions/IBanco';
import { IPrestamo } from 'definitions/IPrestamo';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { IEmpleado } from 'definitions/IEmpleado';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Empleado',
    selector: (row: { empleado: any }) => row.empleado,
    sortable: true,
  },
  {
    name: 'Banco',
    selector: (row: { banco: any }) => row.banco,
    sortable: true,
  },
  {
    name: 'Cuenta',
    selector: (row: { cuenta: any }) => row.cuenta,
    sortable: true,
  },
  {
    name: 'Cuotas',
    selector: (row: { cuota: any }) => row.cuota,
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
    id_empleado: '2',
    entidad: 'Banco Industrial',
    cuotas: 12,
    monto: 5000,
  },
];

// const bancos = [
//   { value: 'bi', label: 'Banco Industrial' },
//   { value: 'banrural', label: 'Banrural' },
//   { value: 'bac', label: 'Bac' },
// ];

const Prestamos: React.FC<IPlainObject> = ({ bancos, prestamos, empleados }) => {
  // const miFuncion = () => {
  //   console.log('hola mundo');
  // };
  const router = useRouter();
  const [formulario, setFormulario] = useState({
    empleado: '',
    banco: '',
    cuenta: '',
    monto: '',
    cuota: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event', event);
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectChangeEmpleado = (event: any) => {
    const empleado = event.label;
    setFormulario({ ...formulario, empleado: empleado });
  };

  const handleSelectChangeBanco = (event: any) => {
    const banco = event.label;
    setFormulario({ ...formulario, banco: banco });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('formulario', formulario);
    try {
      const docRef = await addDoc(collection(firestore, 'prestamos'), {
        ...formulario,
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
            <h1>Prestamos</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Prestamos</CardHeader>
              <CardBody>
                <PrestamosForm
                  handleSubmit={handleSubmit}
                  bancos={bancos}
                  empleados={empleados}
                  handleSelectChangeEmpleado={handleSelectChangeEmpleado}
                  handleSelectChangeBanco={handleSelectChangeBanco}
                  handleChange={handleChange}
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
              <CardHeader>Listado de Prestamos</CardHeader>
              <CardBody>
                <Tabla columns={columns} data={prestamos} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export async function getStaticProps() {
  const bancos: IBanco[] = [];
  const prestamos: IPrestamo[] = [];
  const empleados: IEmpleado[] = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, 'bancos'));
    querySnapshot.forEach((doc) => {
      const banco: IBanco = {
        id: doc.id,
        nombre: doc.data().nombre,
        descripcion: doc.data().descripcion,
      };
      bancos.push(banco);
    });
  } catch (error) {
    console.error('Error al leer la colección bancos ', error);
  }

  try {
    const querySnapshot = await getDocs(collection(firestore, 'prestamos'));
    querySnapshot.forEach((doc) => {
      const prestamo: IPrestamo = {
        id: doc.id,
        banco: doc.data().banco,
        empleado: doc.data().empleado,
        cuota: doc.data().cuota,
        cuenta: doc.data().cuenta,
        monto: doc.data().monto,
      };
      prestamos.push(prestamo);
    });
  } catch (error) {
    console.error('Error al leer la colección prestamos ', error);
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

  return { props: { bancos, prestamos, empleados } };
}

export default Prestamos;
