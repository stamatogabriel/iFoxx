import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Container, Input, Button, Loading, Title, theme, InputWrapper, Hr } from '~/components/styles';
import { ThemeProvider } from '@material-ui/core'

import api from '~/services/api'

import { Cpf as CpfMask, Phone as PhoneMask } from '~/components/Masks'

export default function SellerUpdate(props) {
    const [isLoading, setLoading] = useState()
    const [name, setName] = useState(props.seller.name)
    const [cpf, setCpf] = useState(props.seller.cpf)
    const [phone, setPhone] = useState(props.seller.phone)
    const [cellphone, setCellphone] = useState(props.seller.cellphone)
    const [bank, setBank] = useState()
    const [cc, setCc] = useState()
    const [agency, setAgency] = useState()

    async function updateSeller() {
        try {
            setLoading(true)
            await api.put(`/sellers/${props.seller.id}`, { name, cpf, phone, cellphone, bank, cc, agency })
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
                    Editando vendedor
            </Title>
                <InputWrapper>
                    <Input
                        size='small'
                        label='Nome completo'
                        variant='outlined'
                        onChange={e => setName(e.target.value)}
                        style={{ width: '49.5%' }}
                    />
                    <Input
                        size='small'
                        variant='outlined'
                        onChange={e => setCpf(CpfMask(e.target.value))}
                        value={cpf}
                        label='CPF'
                        style={{ width: '49.5%' }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                        size='small'
                        variant='outlined'
                        onChange={e => setPhone(PhoneMask(e.target.value))}
                        value={phone}
                        label='Telefone'
                        style={{ width: '49.5%' }}
                    />
                    <Input
                        size='small'
                        variant='outlined'
                        onChange={e => setCellphone(PhoneMask(e.target.value))}
                        value={cellphone}
                        label='Celular'
                        style={{ width: '49.5%' }}
                    />
                </InputWrapper>
                <Hr />
                <Title variant='h5'>
                    Dados bancários
                </Title>
                <Input
                    size='small'
                    variant='outlined'
                    onChange={e => setBank(e.target.value)}
                    label='Banco'
                />
                <InputWrapper>
                    <Input
                        size='small'
                        variant='outlined'
                        onChange={e => setAgency(e.target.value)}
                        label='Agência'
                        style={{ width: '49.5%' }}
                    />
                    <Input
                        size='small'
                        variant='outlined'
                        onChange={e => setCc(e.target.value)}
                        label='Conta Corrente'
                        style={{ width: '49.5%' }}
                    />
                </InputWrapper>
                {isLoading ? (
                    <Loading />
                ) : (
                        <Button
                            color="primary"
                            onClick={updateSeller}
                            variant="contained"
                        >
                            Salvar
                    </Button>
                    )}
            </ThemeProvider>
        </Container>
    );
}
