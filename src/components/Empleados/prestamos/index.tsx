import { Button, Col, Row, Select } from '@paljs/ui';
import { IPlainObject } from 'definitions/IPlainObjects';
import { ButtonWrap, InputWrap } from './style';

const PrestamosForm: React.FC<IPlainObject> = ({ handleSubmit, bancos }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          {/* <InputWrap fullWidth size="Medium">
            <input type="text" placeholder="Entidad" />
            <Select options={bancos} placeholder="Entidad" />
          </InputWrap> */}
          <Select options={bancos} placeholder="Entidad" />
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" placeholder="Cuotas" />
          </InputWrap>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 4 }}>
          <InputWrap fullWidth size="Medium">
            <input type="number" placeholder="Monto" />
          </InputWrap>
        </Col>
      </Row>
      <ButtonWrap align={'end'}>
        <Button type="submit">Guardar</Button>
      </ButtonWrap>
    </form>
  );
};
export default PrestamosForm;
