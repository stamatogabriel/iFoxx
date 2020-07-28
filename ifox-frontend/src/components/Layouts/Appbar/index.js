import React from 'react';

import { Close as CloseIcon } from '@material-ui/icons'
import { IconButton } from '~/components/styles'
import { StyledAppBar, StyledToolbar, StyledTypografy } from './styles'

const Appbar = (props) =>
    <StyledAppBar>
        <StyledToolbar>
            <StyledTypografy variant="h6" color='#fff'>
                Contrato {props.title}
            </StyledTypografy>
            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
                <CloseIcon />
            </IconButton>
        </StyledToolbar>
    </StyledAppBar>

    ;

export default Appbar;
