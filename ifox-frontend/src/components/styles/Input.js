import styled from 'styled-components';
import { TextField } from '@material-ui/core'

const Input = styled(TextField)`
     width: 100%;
     margin: 5px 0 !important;

     input {
     text-transform: uppercase;
    }

    & + & {
      margin-top: 15px;
    }
`;

export default Input