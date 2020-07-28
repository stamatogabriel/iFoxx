import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Title = styled(Typography)`
    margin: 15px;
    margin-bottom: 25px !important; 
    color: ${props => props.color ? props.color : '#AB3229'};
`;

export default Title