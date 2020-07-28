import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, ThemeProvider } from '@material-ui/core'
import { AddButton, Modal, theme, IconButton, TableCell } from '~/components/styles'
import { Dashboard } from '~/components/Layouts'
import { Delete, Edit, Visibility } from '@material-ui/icons'
import { toast } from 'react-toastify';

import { Container } from '~/components/styles';
import Search from '~/components/Search'
import api from '~/services/api'

import SellerRegister from './components/Seller/SellerRegister'
import SellerUpdate from './components/Seller/SellerUpdate'

export default function SellersList() {
    const [sellers, setSellers] = useState([])
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [sellerEdit, setSellerEdit] = useState({})

    useEffect(() => {
        getSeller()
    }, [])

    async function getSeller() {
        try {
            const response = await api.get('/sellers')
            setSellers(response.data)
        } catch (err) {
            console.log(err)
            toast.error("Algo deu errado. Por favor tente novamente mais tarde.")
        }
    }

    async function deleteSeller(id) {
        try {
            await api.delete(`/sellers/${id}`)
            getSeller()
            toast.success("Vendedor deletado com sucesso")
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

    const handleClickOpenEdit = (seller) => {
        setSellerEdit(seller)
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
                    <AddButton onClick={handleClickOpen}> Adicionar Vendedor </AddButton>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Celular</TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sellers
                                .map((seller, index) => (
                                    <TableRow
                                        hover
                                        key={seller.id}
                                    >
                                        <TableCell>
                                            {seller.name}
                                        </TableCell>
                                        <TableCell>
                                            {seller.cpf}
                                        </TableCell>
                                        <TableCell>
                                            {seller.phone}
                                        </TableCell>
                                        <TableCell>
                                            {seller.cellphone}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton type='view' onClick={() => { }} >
                                                <Visibility  fontSize="small" />
                                            </IconButton>

                                            <IconButton type='edit' onClick={e => handleClickOpenEdit(seller)} >
                                                <Edit  fontSize="small" />
                                            </IconButton>

                                            <IconButton type='delete' onClick={e => deleteSeller(seller.id)} >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Container>
                <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'> <SellerRegister handleClose={handleClose.bind()} getUser={getSeller.bind()} /> </Modal>
                <Modal open={openEdit} onClose={handleCloseEdit} fullWidth={true} maxWidth='sm'> <SellerUpdate seller={sellerEdit} handleClose={handleCloseEdit.bind()} getUser={getSeller.bind()} /> </Modal>
            </ThemeProvider>
        </Dashboard>
    );
}
