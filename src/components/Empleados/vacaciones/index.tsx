import { Button, Col, Row, Select } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import { IEmpleado } from 'definitions/IEmpleado';
import { IPlainObject } from 'definitions/IPlainObjects';
import { useEffect, useState } from 'react';
import { ButtonWrap, InputWrap, SelectWrap } from './style';

const vacacionesForm: React.FC<IPlainObject> = ({
  empleados,
  handleSubmit,
  handleChange,
  handleFechaIChange,
  handleFechaFChange,
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
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Descripcion:</label>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Descripcion" name="descripcion" onChange={handleChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Fecha de vacaciones inicio:</label>
          <InputWrap fullWidth size="Medium">
            <input type="date" placeholder="FechaI" name="fechaI" onChange={handleFechaIChange} required />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <label>Fecha de vacaciones fin:</label>
          <InputWrap fullWidth size="Medium">
            <input type="date" placeholder="FechaF" name="fechaF" onChange={handleFechaFChange} required />
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
export default vacacionesForm;
