import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { Container, Input, Button, Loading, MenuItem, Title, theme, FormControl } from '~/components/styles';
import { ThemeProvider, Select, InputLabel } from '@material-ui/core'

import api from '~/services/api'

export default function TruckUpdate(props) {
    const [isLoading, setLoading] = useState()
    const [license, setLicense] = useState(props.truck.license)
    const [max_volume, setVolume] = useState(props.truck.max_volume)
    const [truck_type, setType] = useState(props.truck.truck_type)
    const [notes, setNotes] = useState(props.truck.notes ? props.truck.notes : '')

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, [])

    async function updateTruck() {
        try {
            setLoading(true)

            await api.put(`/vehicules/${props.truck.id}`, {
                license,
                max_volume,
                truck_type,
                notes
            })

            props.getTrucks()
            toast.success(`Veículo ${license} foi atuaizado com sucesso.`)
            props.handleClose()
        } catch (err) {
            setLoading(false)
            console.log(err)
            toast.error('Algo deu errado. Verifique os dados e tente novamente.')
        }
    }

    const handleChange = event => {
        setType(event.target.value);
    };

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Title variant='h4'>
                    Atualizando veículo {license}
                </Title>
                <Input
                    size='small'
                    label='Placa'
                    variant='outlined'
                    value={license}
                    onChange={e => setLicense(e.target.value)}
                />

                <FormControl variant="outlined" size='small'>
                    <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                        Tipo de veículo
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={truck_type}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                    >
                        <MenuItem value="">
                            <em>Selecione o tipo de veículo</em>
                        </MenuItem>
                        <MenuItem value='Toco'>Toco</MenuItem>
                        <MenuItem value='Truck'>Truck</MenuItem>
                        <MenuItem value='Bi-Truck'>Bi-Truck</MenuItem>
                        <MenuItem value='Cavalo'>Cavalo</MenuItem>
                        <MenuItem value='Carreta'>Carreta</MenuItem>
                    </Select>
                </FormControl>
                {(truck_type && truck_type !== 'Cavalo') &&
                    <Input
                        size='small'
                        variant='outlined'
                        onChange={e => setVolume(e.target.value)}
                        value={max_volume}
                        label='Volume Máximo'
                    />
                }
                        <Input
          size="small"
          multiline
          label="Observações"
          variant="outlined"
          onChange={(e) => setNotes(e.target.value)}
        />
                {isLoading ? (
                    <Loading />
                ) : (
                        <Button
                            color="primary"
                            onClick={updateTruck}
                            variant="contained"
                        >
                            Salvar
                    </Button>
                    )}
            </ThemeProvider>
        </Container>
    );
}
