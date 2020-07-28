import { Fab } from '@material-ui/core'
import styled from 'styled-components';

const ActionButton = styled(Fab)`
    margin: 20px 10px 0 auto !important;
    background: #093313 !important;
    color: #fff !important;
    &:hover {
        background: #0B4017 !important;
    }
`;

export default ActionButton