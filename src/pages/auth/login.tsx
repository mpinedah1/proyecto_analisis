import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Link from 'next/link';
import Auth from 'components/Auth';
import Layout from 'Layouts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const router = useRouter();

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    localStorage.setItem('email', email);

    router.push('/dashboard');
  };

  return (
    <Layout title="Seguridad 101">
      <Auth title="Ingrese sus Credenciales" subTitle="Solo Personal Autorizado">
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
        </form>
        <p>
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </p>
        <p>
          <Link href="/dashboard">
            <a>Home Page</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
};

export default Login;
