import React from 'react';

import { InputLabel, OutlinedInput, InputAdornment, FormControl, ThemeProvider } from '@material-ui/core'
import { theme } from './styles'
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons'
// import { Container } from './styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        marginTop: '20px',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 200,
    },
}));

export default function Search(props) {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Buscar</InputLabel>
                <OutlinedInput
                    startAdornment={<InputAdornment position="start"> <SearchIcon /> </InputAdornment>}
                    labelWidth={60}
                />
            </FormControl>
        </ThemeProvider>
    );
}
