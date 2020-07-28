import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Table, TableBody, TableHead, TableRow, ThemeProvider, Slide, Dialog } from '@material-ui/core'
import { NoteAdd, Visibility, Edit, Delete } from '@material-ui/icons'

import { Dashboard } from '~/components/Layouts'
import { Container, TableCell } from '~/components/styles';
import { AddButton, Modal, theme, IconButton } from '~/components/styles'
import Search from '~/components/Search'

import ContractRegister from './components/Contract/ContractRegister'
import ContractViewer from './components/Contract/ContractViewer'

import api from '~/services/api'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContractsList() {
    const [open, setOpen] = useState(false)
    const [openViewer, setOpenViewer] = useState(false)
    const [contracts, setContracts] = useState([])
    const [contractView, setContractView] = useState({})
    const [sellers, setSellers] = useState([])
    const [enterprises, setEnterprises] = useState([])

    useEffect(() => {
        getContracts()
        getPartners()
    }, [])

    async function getPartners() {
        const responseEnterprises = await api.get('/enterprises')
        setEnterprises(responseEnterprises.data)

        const responseSellers = await api.get('/sellers')
        setSellers(responseSellers.data)
    }

    const getContracts = async () => {
        const response = await api.get('contracts')
        setContracts(response.data)
    }

    const deleteContract = async (id) => {
        await api.delete(`contracts/${id}`)
        getContracts()
        toast.success('Contrato deleteado com sucesso')
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenViewer = (contract) => {
        setContractView(contract)
        setOpenViewer(true)
    }

    const handleCloseViewer = () => {
        setOpenViewer(false)
        getContracts()
    }

    return (
        <Dashboard>
            <ThemeProvider theme={theme}>
                <Container>
                    <Search />
                    <AddButton onClick={handleOpen}><NoteAdd style={{ marginRight: '10px' }} /> Novo Contrato </AddButton>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Contrato</TableCell>
                                <TableCell>Armazém</TableCell>
                                <TableCell>Distribuidora</TableCell>
                                <TableCell>Volume</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contracts.map(contract =>
                                <TableRow key={contracts.id}>
                                    <TableCell>
                                        {contract.contract_number}
                                    </TableCell>
                                    <TableCell>
                                        {contract.storages.name}
                                    </TableCell>
                                    <TableCell>
                                        {contract.enterprises.corporate_name}
                                    </TableCell>
                                    <TableCell>
                                        {contract.volume.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton type='view' onClick={e => handleOpenViewer(contract)} >
                                            <Visibility  fontSize="small" />
                                        </IconButton>
                                        {console.log(contract)}
                                        <IconButton type='edit' onClick={() => { }} >
                                            <Edit  fontSize="small" />
                                        </IconButton>
                                        <IconButton type='delete' onClick={e => deleteContract(contract.id)} >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
                        <ContractRegister handleClose={handleClose.bind()} getContracts={getContracts.bind()} />
                    </Modal>
                    <Dialog fullScreen open={openViewer} onClose={handleCloseViewer} TransitionComponent={Transition} >
                        <ContractViewer onClose={handleCloseViewer.bind()} sellers={sellers} contract={contractView} enterprises={enterprises} />
                    </Dialog>
                </Container>
            </ThemeProvider>
        </Dashboard >
    );
}
