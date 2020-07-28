import React, { useState, useEffect } from "react";
import {
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  List,
  Title,
  ListItem,
  IconButton,
  AddButton,
  Modal,
} from "~/components/styles";
import { Dashboard } from "~/components/Layouts";
import { Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import { Container } from "~/components/styles";
import Search from "~/components/Search";
import api from "~/services/api";

import EnterpriseTypesRegister from "./components/EnterpriseTypes/EnterpriseTypesRegister";
import EnterpriseTypesUpdate from './components/EnterpriseTypes/EnterpriseTypesUpdate'

export default function EnterpriseTypesList() {
  const [types, setTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [type, setType] = useState()

  useEffect(() => {
    getTypes();
  }, []);

  async function getTypes() {
    try {
      const response = await api.get("/types");
      setTypes(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  async function deleteProduct(id) {
    try {
      await api.delete(`/types/${id}`);
      getTypes();
      toast.success("Tipo de empresa deletado com sucesso");
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenUpdate = (value) => {
    setType(value)
    setOpenEdit(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleCloseUpdate = (value) => {
    setOpenEdit(false);
  };

  return (
    <Dashboard>
      <Container>
        <Search />
        <AddButton onClick={handleClickOpen}> Adicionar Tipo de Empresa </AddButton>
        <List style={{ width: "80%" }}>
          {types.length === 0 ? (
            <Title variant="h2">Não há nada para ser exibido</Title>
          ) : (
            types.map((type) => (
              <ListItem key={type.id}>
                <ListItemText primary={type.type.toUpperCase()} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={(e) => handleClickOpenUpdate(type)}>
                    <Edit  fontSize="small" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => deleteProduct(type.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Container>
      <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <EnterpriseTypesRegister
          handleClose={handleClose.bind()}
          getTypes={getTypes.bind()}
        />
      </Modal>
      <Modal open={openEdit} onClose={handleCloseUpdate} fullWidth={true} maxWidth="sm">
        <EnterpriseTypesUpdate
          type={type}
          handleClose={handleCloseUpdate.bind()}
          getTypes={getTypes.bind()}
        />
      </Modal>
    </Dashboard>
  );
}
