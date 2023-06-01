import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IEmpleado } from 'definitions/IEmpleado';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap, SelectWrap } from './style';

const liquidacionesForm: React.FC<IPlainObject> = ({
  empleados,
  handleSubmit,
  handleChange,
  handleSelectChange,
  loading,
}) => {
  const [datos, setDatos] = useState<any[]>([]);
  const generarDatos = () => {
    const valores: any = [];
    empleados.map((empleado: IEmpleado) => {
      const value = {
        label: `${empleado.nombres} ${empleado.apellidos}`,
        value: empleado.id,
      };
      valores.push(value);
      setDatos(valores);
    });
  };

  useEffect(() => {
    generarDatos();
  }, [empleados]);

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Empleado:</label>
          <SelectWrap>
            <Select options={datos} placeholder="Empleado" name="empleado" onChange={handleSelectChange} required />
          </SelectWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 12 }}>
          <label>Total a pagar:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Total" name="total" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Perido:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Periodo" name="periodo" onChange={handleChange} required />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">
          Guardar
          {loading && <CustomSpinner status="Primary" size="Small" />}
        </Button>
      </ButtonWrap>
    </form>
  );
};
export default liquidacionesForm;
