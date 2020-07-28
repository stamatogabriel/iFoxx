import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Container, InputLogin as Input, Button, Loading, Title } from '~/components/styles';

import api from '~/services/api'

export default function UserUpdate(props) {
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setLoading] = useState()

    async function update() {
        try {
            setLoading(true)
            await api.put('/users', { email, username, password })
            props.getUser()
            toast.success(`Usuário ${username} foi alterado com sucesso.`)
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
                Atualização de usuário
                </Title>
            <Input
                label='Username'
                variant='outlined'
                size='small'
                onChange={e => setUsername(e.target.value)}
            />
            <Input
                label='Email'
                type='email'
                variant='outlined'
                size='small'
                onChange={e => setEmail(e.target.value)}
            />
            <Input
                label='Password'
                type='password'
                variant='outlined'
                size='small'
                onChange={e => setPassword(e.target.value)}
            />
            {isLoading ? (
                <Loading />
            ) : (
                    <Button
                        color="primary"
                        onClick={update}
                        variant="contained"
                    >
                        Salvar
                                                </Button>
                )}
        </Container>
    );
}
