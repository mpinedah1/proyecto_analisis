import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Link from 'next/link';
import Auth from 'components/Auth';
import Layout from 'Layouts';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from 'utilities/firebase';

// Importa tu imagen desde un archivo
import logoImage from 'logo-umg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [] = useState('');
  const [credentialsInvalid, setCredentialsInvalid] = useState(false);

  const router = useRouter();

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Verificar si el correo y la contraseña coinciden en Firebase
    const q = query(collection(firestore, 'usuarios'), where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Las credenciales son inválidas
      setCredentialsInvalid(true);
      return;
    }

    // Restablecer el estado
    setCredentialsInvalid(false);

    localStorage.setItem('email', email);

    router.push('/dashboard');
  };

  return (
    <Layout title="Seguridad 101">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logoImage.src} alt="Logo" />
      </div>
      <Auth title="Ingrese sus Credenciales" subTitle="Solo Personal Autorizado Nomina">
        <form onSubmit={handleSubmit}>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </InputGroup>
          <Button status="Success" type="submit" shape="SemiRound" fullWidth>
            Login
          </Button>
          {credentialsInvalid && <p>Credenciales inválidas.</p>}
        </form>
        <p>
          <Link href="/auth/register">
            <a>Ir a Register</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
};

export default Login;
