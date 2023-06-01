import { InputGroup } from '@paljs/ui';
import styled from 'styled-components';

const InputWrap = styled(InputGroup)`
  margin-bottom: 15px;
`;

const ButtonWrap = styled.div<{ align: string }>`
  display: flex;
  justify-content: ${(props) => props.align};
  padding-top: 20px;
`;

const SelectWrap = styled.div`
  margin-bottom: 10px;
`;

export { InputWrap, ButtonWrap, SelectWrap };
