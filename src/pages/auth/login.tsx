import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';
import Link from 'next/link';

import Auth from 'components/Auth';
import Layout from 'Layouts';

export default function Login() {
  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hola Mundo">
        <form>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Password" />
          </InputGroup>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
        <p>
          Registro
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
