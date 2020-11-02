import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  ThemeProvider,
  Button
} from "@material-ui/core";
import {
  TableCell,
  Modal,
  theme,
  IconButton,
  ActionButton,
  Container
} from "~/components/styles";
import { Dashboard } from "~/components/Layouts";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import { toast } from "react-toastify";

import api from "~/services/api";

import history from "~/services/history";

import SellRegister from "./components/Sell/SellRegister";
import SellUpdate from "./components/Sell/SellUpdate";
import AddContract from "./components/Sell/AddContract";

import styled from "styled-components";

export const CustomButton = styled(Button)`
  color: #ab3211 !important;
`;

export default function SellsList() {
  const [sells, setSells] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [groups, setGroups] = useState([])
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [sellEdit, setSellEdit] = useState({});
  const [addContract, setAddContract] = useState(false);
  const [types, setTypes] = useState([])
  const [enterpriseTypes, setEnterpriseTypes] = useState([])

  useEffect(() => {
    getLists();
  }, []);

  async function getLists() {
    try {
      const responseContracts = await api.get("/contracts");
      setContracts(responseContracts.data);

      const responseSellers = await api.get("/sellers");
      setSellers(responseSellers.data);

      const responseGroups = await api.get("/groups")
      setGroups(responseGroups.data)

      const responseEnterprises = await api.get("/enterprises");
      setEnterprises(responseEnterprises.data);

      const response = await api.get(`sells`);
      setSells(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  const getEnterpriseName = id => {
    const name = enterprises.filter(item => id === item.id);
    return name[0].corporate_name;
  };

  const getSellerName = id => {
    const name = sellers.filter(item => id === item.id);
    return name[0].name;
  };

  async function getSells() {
    try {
      const response = await api.get(`sells`);
      setSells(response.data);
    } catch (err) {
      console.log(err.error);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  async function deleteSell(id) {
    try {
      await api.delete(`sells/${id}`);
      getSells();
      console.log(sells);
      toast.success("Venda deletada com sucesso");
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  const handleClickOpen = () => {
    return setOpen(true);
  };

  const handleClose = value => {
    getSells();
    setOpen(false);
  };

  const handleClickOpenEdit = sell => {
    setSellEdit(sell);
    setOpenEdit(true);
  };

  const handleCloseEdit = value => {
    setOpenEdit(false);
  };

  const handleContractOpen = sell => {
    setSellEdit(sell);
    setAddContract(true);
  };

  const handleContractClose = value => {
    getSells();
    setAddContract(false);
  };

  const getContract = id => {
    const contract = contracts.filter(item => item.id === id)[0];

    return contract.contract_number;
  };

  return (
    <Dashboard>
      <ThemeProvider theme={theme}>
        <Container>
          <Container>
            <ActionButton
              colorButton="success"
              variant="extended"
              onClick={handleClickOpen}
            >
              Adicionar nova venda
            </ActionButton>
          </Container>
          {sells.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vendedor</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Preço de Venda</TableCell>
                  <TableCell>Volume</TableCell>
                  <TableCell>Contrato</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sells.map((sell, index) => (
                  <TableRow hover key={sell.id}>
                    <TableCell>{getSellerName(sell.seller_id)}</TableCell>
                    <TableCell>{getEnterpriseName(sell.client_id)}</TableCell>
                    <TableCell>
                      R$ {sell.sell_price.toFixed(2).replace(".", ",")}
                    </TableCell>
                    <TableCell>{sell.volume}</TableCell>
                    <TableCell>
                      {sell.contract_id === null ? (
                        <CustomButton onClick={() => handleContractOpen(sell)}>
                          Adicionar Contrato
                        </CustomButton>
                      ) : (
                        getContract(sell.contract_id)
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        type="view"
                        onClick={() => history.push(`/sells/view/${sell.id}`)}
                      >
                        <Visibility  fontSize="small" />
                      </IconButton>

                      <IconButton
                        type="edit"
                        onClick={e => handleClickOpenEdit(sell)}
                      >
                        <Edit  fontSize="small" />
                      </IconButton>

                      <IconButton
                        type="delete"
                        onClick={e => deleteSell(sell.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Container>
        <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
          <SellRegister
            groups={groups}
            enterprises={enterprises}
            sellers={sellers}
            handleClose={handleClose.bind()}
          />
        </Modal>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          fullWidth={true}
          maxWidth="sm"
        >
          <SellUpdate
            sell={sellEdit}
            enterprises={enterprises}
            handleClose={handleCloseEdit.bind()}
            getUser={getSells.bind()}
          />
        </Modal>
        <Modal
          open={addContract}
          onClose={handleContractClose}
          fullWidth={true}
          maxWidth="sm"
        >
          <AddContract sell={sellEdit} close={handleContractClose} />
        </Modal>
      </ThemeProvider>
    </Dashboard>
  );
}
