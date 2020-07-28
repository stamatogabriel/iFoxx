import { Button } from '@material-ui/core'
import styled from 'styled-components';

const AddButton = styled(Button)`
    background-color: #00400A !important;
    margin: 20px auto 25px 15px !important;
    height: 45px;
    width: 25%;
    padding: 5px !important;
    color: #fff !important;
    &:hover {
        background-color: #008013 !important;
  }
`;

export default AddButton