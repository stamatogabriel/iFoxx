import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@material-ui/core'


export const StyledAppBar = styled(AppBar)`
  position: 'relative';
`;

export const StyledToolbar = styled(Toolbar)` 
    margin-right: 10px;
    margin-left: auto;
    justify-content: space-between;
    flex: 1;
`;

export const StyledTypografy = styled(Typography)` 
    color: #fff;
    margin-right: auto !important;
    margin-left: 10px !important;
`
