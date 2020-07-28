import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@material-ui/core";
import {
  AddButton,
  Modal,
  theme,
  IconButton,
  TableCell,
} from "~/components/styles";
import { Dashboard } from "~/components/Layouts";
import { Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import EnterpriseRegister from "./components/Enterprise/EnterpriseRegister";
import EnterpriseUpdate from "./components/Enterprise/EnterpriseUpdate";

import { Container } from "~/components/styles";
import Search from "~/components/Search";
import api from "~/services/api";

export default function EnterprisesList() {
  const [enterprises, setEnterprises] = useState([]);
  const [types, setTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [enterpriseEdit, setEnterpriseEdit] = useState({});
  const [enterpriseTypes, setEnterpriseTypes] = useState([]);

  useEffect(() => {
    getEnterprises();
  }, []);

  async function getEnterprises() {
    try {
      const response = await api.get("/enterprises");
      setEnterprises(response.data);

      const data = await api.get("/types");
      setTypes(data.data);

      const responseTypes = await api.get("/enterprise_types");
      setEnterpriseTypes(responseTypes.data);
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  async function deleteEnterprise(id) {
    try {
      await api.delete(`/enterprises/${id}`);
      getEnterprises();
      toast.success("Empresa deletada com sucesso");
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleClickOpenEdit = (enterprise) => {
    setEnterpriseEdit(enterprise);
    setOpenEdit(true);
  };

  const handleCloseEdit = (value) => {
    setOpenEdit(false);
  };

  return (
    <Dashboard>
      <ThemeProvider theme={theme}>
        <Container>
          <Search />
          <AddButton onClick={handleClickOpen}> Adicionar Empresa </AddButton>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Razão Social</TableCell>
                <TableCell>CNPJ</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enterprises.map((enterprise, index) => (
                <TableRow hover key={enterprise.id}>
                  <TableCell>{enterprise.corporate_name}</TableCell>
                  <TableCell>{enterprise.cnpj}</TableCell>
                  <TableCell>{enterprise.city}</TableCell>
                  <TableCell>{enterprise.contact}</TableCell>
                  <TableCell>{enterprise.phone}</TableCell>
                  <TableCell>
                    <IconButton
                      type="edit"
                      onClick={(e) => handleClickOpenEdit(enterprise)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>

                    <IconButton
                      type="delete"
                      onClick={(e) => deleteEnterprise(enterprise.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
        <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
          {" "}
          <EnterpriseRegister
            handleClose={handleClose.bind()}
            getUser={getEnterprises.bind()}
            types={types}
          />{" "}
        </Modal>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          fullWidth={true}
          maxWidth="sm"
        >
          {" "}
          <EnterpriseUpdate
            enterprise={enterpriseEdit}
            handleClose={handleCloseEdit.bind()}
            getUser={getEnterprises.bind()}
            types={types}
            enterpriseTypes={enterpriseTypes}
          />{" "}
        </Modal>
      </ThemeProvider>
    </Dashboard>
  );
}
