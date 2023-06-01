import { Button, Col, Row } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IEmpleado } from 'definitions/IEmpleado';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap } from './style';

const empleadosForm: React.FC<IPlainObject> = ({ empleados, handleSubmit, handleChange, loading }) => {
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
        <Col breakPoint={{ xs: 12, sm: 12 }}>
          <label>Nombres:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="nombres" name="nombres" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Apellidos:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="apellidos" name="apellidos" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Correo:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="correo" name="correo" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Direccion:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="direccion" name="direccion" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>DPI:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="dpi" name="dpi" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Estado:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="estado" name="estado" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Genero:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="genero" name="genero" onChange={handleChange} required />
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
export default empleadosForm;
