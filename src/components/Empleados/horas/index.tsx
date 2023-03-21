import { Button, Col, Row } from '@paljs/ui';
import { IPlainObject } from 'definitions/IPlainObjects';
import { ButtonWrap, InputWrap } from './style';

const HorasExtrasForm: React.FC<IPlainObject> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 12 }}>
          <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Descripcion" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 12 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" placeholder="Id Autorizacion" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 12 }}>
          <label className="form-label">Fecha:</label>
          <InputWrap fullWidth size="Medium">
            <input type="date" placeholder="Fecha" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 12 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" placeholder="Horas Trabajadas" />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">Guardar</Button>
      </ButtonWrap>
    </form>
  );
};
export default HorasExtrasForm;
