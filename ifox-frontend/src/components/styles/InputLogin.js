import styled from 'styled-components';
import { TextField } from '@material-ui/core'

const InputLogin = styled(TextField)`
     width: 100%;
     margin: 5px 0 !important;

    & + & {
      margin-top: 15px;
    }
`;

export default InputLogin