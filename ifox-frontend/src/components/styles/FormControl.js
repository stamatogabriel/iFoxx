import styled from 'styled-components';
import { FormControl } from '@material-ui/core'

const StyledFormControl = styled(FormControl)`
     width: 100%;
     margin: 5px  0 !important;
    & + & {
      margin-top: 15px;
    }
`;

export default StyledFormControl