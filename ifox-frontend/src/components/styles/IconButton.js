import { IconButton } from '@material-ui/core'
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
    margin: 2px !important;
    padding: 0 !important;
    size: 5px;
    :hover {
        color: ${props => {
        if (props.type === 'delete')
            return '#E8250C'

        if (props.type === 'edit')
            return '#0A4001'

        if (props.type === 'view')
            return '#2341E8'
    }} !important
    }
`;

export default StyledIconButton