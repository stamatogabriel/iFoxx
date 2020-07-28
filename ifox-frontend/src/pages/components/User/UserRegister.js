import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Container, InputLogin as Input, Button, Loading, Title } from '~/components/styles';

import api from '~/services/api'

export default function UserRegister(props) {
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setLoading] = useState()

    async function register() {
        try {
            setLoading(true)
            await api.post('/users', { email, username, password })
            props.getUser()
            toast.success(`Usuário ${username} foi cadastrado com sucesso.`)
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
                Cadastro de usuário
                </Title>
            <Input
                label='Username'
                variant='outlined'
                onChange={e => setUsername(e.target.value)}
            />
            <Input
                label='Email'
                type='email'
                variant='outlined'
                onChange={e => setEmail(e.target.value)}
            />
            <Input
                label='Password'
                type='password'
                variant='outlined'
                onChange={e => setPassword(e.target.value)}
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
