import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from 'utilities/firebase';
import Auth from 'components/Auth';
import Layout from 'Layouts';

export default function Login() {
  const [idEmpleado, setIdEmpleado] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('administrador');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Agrega los datos a Firebase Firestore
    try {
      const docRef = await addDoc(collection(firestore, 'usuarios'), {
        idEmpleado,
        email,
        password,
        role,
      });

      console.log('Documento agregado con ID:', docRef.id);

      // Restablecer los campos del formulario
      setIdEmpleado('');
      setEmail('');
      setPassword('');
      setRole('administrador');

      // Redirigir al path /auth/login
      router.push('/auth/login');
    } catch (error) {
      console.error('Error al agregar los datos a Firebase Firestore:', error);
    }
  };

  return (
    <Layout title="Registrese">
      <Auth title="Registro a Sistema Nomina" subTitle="Ingrese sus datos Personales">
        <form onSubmit={handleSubmit}>
          <InputGroup fullWidth>
            <input
              type="text"
              placeholder="Id Empleado"
              value={idEmpleado}
              onChange={(e) => setIdEmpleado(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </InputGroup>
          <InputGroup fullWidth>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup fullWidth>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="administrador">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </InputGroup>
          <Button status="Success" type="submit" shape="SemiRound" fullWidth>
            REGISTRARSE
          </Button>
        </form>
        <p>
          <Link href="/auth/login">
            <a>Ir de Nuevo a Login</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
