import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, ThemeProvider } from '@material-ui/core'
import { AddButton, Modal, theme, IconButton, TableCell } from '~/components/styles'
import { Dashboard } from '~/components/Layouts'
import { Delete, Edit, Visibility } from '@material-ui/icons'
import { toast } from 'react-toastify';


import DriverRegister from './components/Driver/DriverRegister'
import DriverUpdate from './components/Driver/DriverUpdate'

import { Container } from '~/components/styles';
import Search from '~/components/Search'
import api from '~/services/api'

export default function DriversList() {
    const [drivers, setDrivers] = useState([])
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [driverEdit, setDriverEdit] = useState({})

    useEffect(() => {
        getDrivers()
    }, [])

    async function getDrivers() {
        try {
            const response = await api.get('/drivers')
            setDrivers(response.data)
        } catch (err) {
            console.log(err)
            toast.error("Algo deu errado. Por favor tente novamente mais tarde.")
        }
    }

    async function deleteDriver(id) {
        try {
            await api.delete(`/drivers/${id}`)
            getDrivers()
            toast.success("Motorista deletado com sucesso")
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

    const handleClickOpenEdit = (driver) => {
        setDriverEdit(driver)
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
                    <AddButton onClick={handleClickOpen}> Adicionar Motorista </AddButton>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>RG</TableCell>
                                <TableCell>CNH</TableCell>
                                <TableCell>Tipo CNH</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {drivers
                                .map((driver, index) => (
                                    <TableRow
                                        hover
                                        key={driver.id}
                                    >
                                        <TableCell>
                                            {driver.name}
                                        </TableCell>
                                        <TableCell>
                                            {driver.cpf}
                                        </TableCell>
                                        <TableCell>
                                            {driver.rg}
                                        </TableCell>
                                        <TableCell>
                                            {driver.cnh}
                                        </TableCell>
                                        <TableCell>
                                            {driver.cnh_category}
                                        </TableCell>
                                        <TableCell>
                                            {driver.phone}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton type='view' onClick={() => { }} >
                                                <Visibility  fontSize="small" />
                                            </IconButton>

                                            <IconButton type='edit' onClick={e => handleClickOpenEdit(driver)} >
                                                <Edit  fontSize="small" />
                                            </IconButton>

                                            <IconButton type='delete' onClick={e => deleteDriver(driver.id)} >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Container>
                <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'> <DriverRegister handleClose={handleClose.bind()} getUser={getDrivers.bind()} /> </Modal>
                <Modal open={openEdit} onClose={handleCloseEdit} fullWidth={true} maxWidth='md'> <DriverUpdate driver={driverEdit} handleClose={handleCloseEdit.bind()} getUser={getDrivers.bind()} /> </Modal>
            </ThemeProvider>
        </Dashboard>
    );
}
