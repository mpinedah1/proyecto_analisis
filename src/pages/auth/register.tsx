import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';
import Link from 'next/link';

import Auth from 'components/Auth';
import Layout from 'Layouts';

export default function Login() {
  return (
    <Layout title="Registrese">
      <Auth title="Registro" subTitle="Ingrese sus datos">
        <form>
          <InputGroup fullWidth>
            <input type="ID Empleado" placeholder="Id Empleado" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Password" />
          </InputGroup>
          <InputGroup fullWidth>
            <select>
              <option value="administrador">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </InputGroup>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
        <p>
          <Link href="/auth/login">
            <a>Back Login</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
