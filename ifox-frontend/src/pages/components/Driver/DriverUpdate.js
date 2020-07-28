import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Container, Input, Button, Loading, Title, theme, InputWrapper } from '~/components/styles';
import { ThemeProvider } from '@material-ui/core'

import api from '~/services/api'

import { Cpf as CpfMask, Phone as PhoneMask } from '~/components/Masks'

export default function DriverUpdate(props) {
    const [isLoading, setLoading] = useState()
    const [name, setName] = useState(props.driver.name)
    const [cpf, setCpf] = useState(props.driver.cpf)
    const [rg, setRg] = useState(props.driver.rg)
    const [cnh, setCnh] = useState(props.driver.cnh)
    const [cnh_category, setCategory] = useState(props.driver.cnh_category)
    const [phone, setPhone] = useState(props.driver.phone)

    async function updateDriver() {
        try {
            setLoading(true)
            await api.put(`/drivers/${props.driver.id}`, { name, cpf, phone, rg, cnh, cnh_category })
            props.getUser()
            toast.success(`Vendedor ${name} foi atualizado com sucesso.`)
            props.handleClose()
        } catch (err) {
            setLoading(false)
            console.log(err)
            toast.error('Algo deu errado. Verifique os dados e tente novamente.')
        }
    }

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Title variant='h4'>
                    Atualizando motorista
            </Title>
                <Input
                    value={name}
                    size='small'
                    label='Nome completo'
                    variant='outlined'
                    onChange={e => setName(e.target.value)}
                />
                <InputWrapper>
                    <Input
                        value={cpf}
                        size='small'
                        variant='outlined'
                        onChange={e => setCpf(CpfMask(e.target.value))}
                        label='CPF'
                        style={{ width: '49.5%', marginTop: 0 }}
                    />
                    <Input
                        value={rg}
                        size='small'
                        variant='outlined'
                        onChange={e => setRg(e.target.value)}
                        label='RG'
                        style={{ width: '49.5%', marginTop: 0 }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                        value={cnh}
                        size='small'
                        variant='outlined'
                        onChange={e => setCnh(e.target.value)}
                        label='CNH'
                        style={{ width: '69.5%', marginTop: 0 }}
                    />
                    <Input
                        value={cnh_category}
                        size='small'
                        variant='outlined'
                        onChange={e => setCategory(e.target.value)}
                        label='Categoria CNH'
                        style={{ width: '29.5%', marginTop: 0 }}
                    />
                </InputWrapper>
                <Input
                    value={phone}
                    size='small'
                    variant='outlined'
                    onChange={e => setPhone(PhoneMask(e.target.value))}
                    label='Telefone'
                />
                {
                    isLoading ? (
                        <Loading />
                    ) : (
                            <Button
                                color="primary"
                                onClick={updateDriver}
                                variant="contained"
                            >
                                Salvar
                    </Button>
                        )
                }
            </ThemeProvider >
        </Container >
    );
}
