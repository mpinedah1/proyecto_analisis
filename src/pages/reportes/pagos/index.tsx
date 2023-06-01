import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from 'utilities/firebase';
import { Button } from '@paljs/ui/Button';
import Link from 'next/link';

const IGGS_CONSTANT = 4.83; // Valor de IGGS en porcentaje
const ISR_CONSTANT = 5; // Valor de ISR en porcentaje

interface Salario {
  nombre: string;
  monto: number;
  subtotal: number; // Nuevo campo para el subtotal
  resta: number; // Nuevo campo para la resta
  isr: number; // Nuevo campo para el ISR
  totalAPagar: number; // Nuevo campo para el total a pagar
}

const SalariosReporte = () => {
  const [salarios, setSalarios] = useState<Salario[]>([]);
  const [totales, setTotales] = useState<{ nombre: string; totalAPagar: number }[]>([]);

  const fetchSalarios = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'salarios'));
      const salariosData = querySnapshot.docs.map((doc) => {
        const { nombre, salario } = doc.data();
        const subtotal = salario / IGGS_CONSTANT;
        const resta = salario - subtotal;
        const isr = resta * (ISR_CONSTANT / 100);
        const totalAPagar = resta - isr;
        return { nombre, monto: salario, subtotal, resta, isr, totalAPagar };
      });
      setSalarios(salariosData);

      const totalesData = salariosData.reduce<{ nombre: string; totalAPagar: number }[]>((accumulator, salario) => {
        const existingItem = accumulator.find((item) => item.nombre === salario.nombre);
        if (existingItem) {
          existingItem.totalAPagar += salario.totalAPagar;
        } else {
          accumulator.push({ nombre: salario.nombre, totalAPagar: salario.totalAPagar });
        }
        return accumulator;
      }, []);
      setTotales(totalesData);
    } catch (error) {
      console.error('Error al obtener los salarios:', error);
    }
  };

  return (
    <div>
      <h1>Reporte de Salarios</h1>
      <h3>Valor del IGGS 4.83%</h3>
      <h3>Valor del ISR 5.00%</h3>
      <Button onClick={fetchSalarios}>Obtener Salarios</Button>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Salario</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>IGGS</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subtotal</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ISR</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total a Pagar</th>
          </tr>
        </thead>
        <tbody>
          {salarios.map((salario, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{salario.nombre}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{salario.monto}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {salario.subtotal.toFixed(2)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {salario.resta.toFixed(2)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {salario.isr.toFixed(2)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                {salario.totalAPagar.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Totales</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total a Pagar</th>
          </tr>
        </thead>
        <tbody>
          {totales.map((total, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{total.nombre}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{total.totalAPagar.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <Link href="/dashboard">
          <a>Ir a Home Page</a>
        </Link>
      </p>
    </div>
  );
};

export default SalariosReporte;
