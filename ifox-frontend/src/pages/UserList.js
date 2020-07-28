import React, { useState, useEffect } from 'react';
import { ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, ThemeProvider } from '@material-ui/core'
import { List, Title, ListItem, IconButton, AddButton, Modal, theme } from '~/components/styles'
import { Dashboard } from '~/components/Layouts'
import { Delete, Edit } from '@material-ui/icons'
import { toast } from 'react-toastify';


import { Container } from '~/components/styles';
import Search from '~/components/Search'
import api from '~/services/api'

import UserRegister from './components/User/UserRegister'

export default function UserList() {
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        try {
            const response = await api.get('/users')
            setUsers(response.data)
        } catch (err) {
            console.log(err)
            toast.error("Algo deu errado. Por favor tente novamente mais tarde.")
        }
    }

    async function deleteUser(id) {
        try {
            await api.delete(`/users/${id}`)
            getUser()
            toast.success("Usuário deletado com sucesso")
        } catch (err) {
            console.log(err)
            toast.error("Algo deu errado. Por favor tente novamente mais tarde.")
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
    };

    return (
        <Dashboard>
            <ThemeProvider theme={theme}>
                <Container>
                    <Search />
                    <AddButton onClick={handleClickOpen}> Adicionar Usuário </AddButton>
                    <List style={{ width: '80%' }} >
                        {!users ? <Title variant='h2'>
                            Não há nada para ser exibido
                    </Title> : users.map(user =>
                                <ListItem key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar>

                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.username}
                                        secondary={user.email} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <Edit  fontSize="small" />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={e => deleteUser(user.id)}>
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                    </List>
                </Container>
                <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth='sm' > <UserRegister handleClose={handleClose.bind()} getUser={getUser.bind()} /> </Modal>
            </ThemeProvider>
        </Dashboard>
    );
}
