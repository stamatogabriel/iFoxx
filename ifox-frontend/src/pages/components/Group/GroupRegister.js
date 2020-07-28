import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Container, Input, Button, Loading, Title } from '~/components/styles';

import api from '~/services/api'

export default function GroupRegister(props) {
    const [name, setName] = useState()
    const [isLoading, setLoading] = useState()

    async function register() {
        try {
            setLoading(true)
            await api.post('/groups', { name })
            props.getGroups()
            toast.success(`Rede ${name} foi cadastrada com sucesso.`)
            props.handleClose()
        } catch (err) {
            setLoading(false)
            console.log(err)
            toast.error('Algo deu errado. Verifique os dados e tente novamente.')
        }
    }

    return (
        <Container>
            <Title variant='h4'>
                Cadastro de Redes
                </Title>
            <Input
                label='Nome da Rede'
                variant='outlined'
                onChange={e => setName(e.target.value)}
            />
            {isLoading ? (
                <Loading />
            ) : (
                    <Button
                        color="primary"
                        onClick={register}
                        variant="contained"
                    >
                        Salvar
                                                </Button>
                )}
        </Container>
    );
}
