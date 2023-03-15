import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Layout from 'Layouts';

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`;
export default function Error(): JSX.Element {
  const router = useRouter();
  return (
    <Layout title="404 Pagina No encontrada">
      <Card>
        <CardBody>
          <ErrorStyle>
            <h1>404 Pagina No encontrada</h1>
            <small>La pagina que estas buscando no existe!</small>
            <ButtonLink fullWidth appearance="hero" onClick={() => router.push('/dashboard')} shape="Rectangle">
              Ir al inicio
            </ButtonLink>
          </ErrorStyle>
        </CardBody>
      </Card>
    </Layout>
  );
}
