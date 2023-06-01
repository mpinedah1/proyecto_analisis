import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from 'utilities/firebase';
import { Button } from '@paljs/ui/Button';
import Auth from 'components/Auth';
import Layout from 'Layouts';
import Link from 'next/link';

const UserList = () => {
  const [users, setUsers] = useState<{ email: string; role: string; id: string }[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'usuarios'));
    const userList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as { email: string; role: string; id: string }),
    );
    setUsers(userList);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(firestore, 'usuarios', userId));
      getUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <Layout title="Lista de Usuarios">
      <Auth title="Lista de Usuarios" subTitle="Administración de usuarios">
        <div style={{ margin: '20px' }}>
          <h1>Usuarios</h1>
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px' }}>Correo</th>
                <th style={{ padding: '10px' }}>Rol</th>
                <th style={{ padding: '10px' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px' }}>{user.role}</td>
                  <td style={{ padding: '10px' }}>
                    <Button status="Danger" onClick={() => handleDeleteUser(user.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <Link href="/auth/register">
              <a>Ir a Register</a>
            </Link>
          </p>
          <p>
            <Link href="/dashboard">
              <a>Ir a Home Page</a>
            </Link>
          </p>
        </div>
      </Auth>
    </Layout>
  );
};

export default UserList;
