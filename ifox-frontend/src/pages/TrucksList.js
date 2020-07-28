import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, ThemeProvider } from '@material-ui/core'
import { AddButton, Modal, theme, IconButton, TableCell } from '~/components/styles'
import { Dashboard } from '~/components/Layouts'
import { Delete, Edit } from '@material-ui/icons'
import { toast } from 'react-toastify';


import TruckRegister from './components/Truck/TruckRegister'
import TruckUpdate from './components/Truck/TruckUpdate'

import { Container } from '~/components/styles';
import Search from '~/components/Search'
import api from '~/services/api'

export default function TurcksList() {
  const [trucks, setTrucks] = useState([])
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [truckEdit, setTruckEdit] = useState({})

  useEffect(() => {
    getTrucks()
  }, [])

  async function getTrucks() {
    try {
      const response = await api.get('/vehicules')
      setTrucks(response.data)
    } catch (err) {
      console.log(err)
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.")
    }
  }

  async function deleteTruck(id) {
    try {
      await api.delete(`/vehicules/${id}`)
      getTrucks()
      toast.success("Placa deletada com sucesso")
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

  const handleClickOpenEdit = (truck) => {
    setTruckEdit(truck)
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
          <div style={{ display: 'flex', width: '100%' }}>
            <AddButton onClick={handleClickOpen}>
              Adicionar Placa
            </AddButton>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Placa</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Volume Max</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trucks
                .map((truck, index) => (
                  <TableRow
                    hover
                    key={truck.id}
                  >
                    <TableCell>
                      {truck.license}
                    </TableCell>
                    <TableCell>
                      {truck.truck_type}
                    </TableCell>
                    <TableCell>
                      {truck.max_volume}
                    </TableCell>
                    <TableCell>
                      <IconButton type='edit' onClick={e => handleClickOpenEdit(truck)} >
                        <Edit  fontSize="small" />
                      </IconButton>
                      <IconButton type='delete' onClick={e => deleteTruck(truck.id)} >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Container>
        <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'> <TruckRegister handleClose={handleClose.bind()} getTrucks={getTrucks.bind()} /> </Modal>
        <Modal open={openEdit} onClose={handleCloseEdit} fullWidth={true} maxWidth='sm'> <TruckUpdate truck={truckEdit} handleClose={handleCloseEdit.bind()} getTrucks={getTrucks.bind()} /> </Modal>
      </ThemeProvider>
    </Dashboard>
  );
}
