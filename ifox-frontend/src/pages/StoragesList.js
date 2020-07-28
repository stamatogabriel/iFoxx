import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, ThemeProvider } from '@material-ui/core'
import { AddButton, Modal, theme, IconButton, TableCell } from '~/components/styles'
import { Dashboard } from '~/components/Layouts'
import { Delete, Edit, Visibility } from '@material-ui/icons'
import { toast } from 'react-toastify';


import StorageRegister from './components/Storage/StorageRegister'
import StorageUpdate from './components/Storage/StorageUpdate'

import { Container } from '~/components/styles';
import Search from '~/components/Search'
import api from '~/services/api'

export default function StoragesList() {
    const [storages, setStorages] = useState([])
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [storageEdit, setStorageEdit] = useState({})

    useEffect(() => {
        getStorages()
    }, [])


    async function getStorages() {
        try {
            const response = await api.get('/storages')
            setStorages(response.data)
        } catch (err) {
            console.log(err)
            toast.error("Algo deu errado. Por favor tente novamente mais tarde.")
        }
    }

    async function deleteStorage(id) {
        try {
            await api.delete(`/storages/${id}`)
            getStorages()
            toast.success("Armazém deletado com sucesso")
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

    const handleClickOpenEdit = (storage) => {
        setStorageEdit(storage)
        setOpenEdit(true);
    };

    const handleCloseEdit = value => {
        setOpenEdit(false);
    };

    return (
        <Dashboard>
            <ThemeProvider theme={theme}>
                <Container>
                    <Search />
                    <AddButton onClick={handleClickOpen}> Adicionar Armazém </AddButton>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Armazém</TableCell>
                                <TableCell>Cidade</TableCell>
                                <TableCell>Contato</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {storages
                                .map((storage, index) => (
                                    <TableRow
                                        hover
                                        key={storage.id}
                                    >
                                        <TableCell>
                                            {storage.name}
                                        </TableCell>
                                        <TableCell>
                                            {storage.city}
                                        </TableCell>
                                        <TableCell>
                                            {storage.contact}
                                        </TableCell>
                                        <TableCell>
                                            {storage.phone}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton type='view' onClick={() => { }} >
                                                <Visibility  fontSize="small" />
                                            </IconButton>

                                            <IconButton type='edit' onClick={e => handleClickOpenEdit(storage)} >
                                                <Edit  fontSize="small" />
                                            </IconButton>

                                            <IconButton type='delete' onClick={e => deleteStorage(storage.id)} >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Container>
                <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'> <StorageRegister handleClose={handleClose.bind()} getUser={getStorages.bind()} /> </Modal>
                <Modal open={openEdit} onClose={handleCloseEdit} fullWidth={true} maxWidth='sm'> <StorageUpdate storage={storageEdit} handleClose={handleCloseEdit.bind()} getUser={getStorages.bind()} /> </Modal>
            </ThemeProvider>
        </Dashboard>
    );
}
