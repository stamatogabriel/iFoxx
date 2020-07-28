import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  List,
  Title,
  ListItem,
  IconButton,
  ActionButton,
  Modal,
  Container,
  GridContainer,
  Card
} from "~/components/styles";
import { ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { Delete, Add, Visibility } from "@material-ui/icons";
import Appbar from "~/components/Layouts/Appbar";
import { toast } from "react-toastify";
import api from "~/services/api";
import history from "~/services/history";

import ContractPayiment from "./ContractPayiment";
import ContractDevolution from "./ContractDevolucion";

import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export default function ContractViewer(props) {
  const [partners, setPartners] = useState([]);
  const [contract, setContract] = useState(props.contract);
  const [open, setOpen] = useState(false);
  const [devolutionOpen, setDevolutionOpen] = useState(false);

  useEffect(() => {
    async function getPartners() {
      const response = await api.get(
        `/contracts/${props.contract.id}/partners`
      );
      return setPartners(response.data);
    }

    getPartners();
  }, [props.contract.id]);

  const getContract = async () => {
    const response = await api.get(`/contracts/${props.contract.id}`);
    return setContract(response.data);
  };

  const getName = id => {
    const name = props.enterprises.filter(item => id === item.id);
    return name[0].corporate_name;
  };

  const getSeller = id => {
    const name = props.sellers.filter(item => id === item.id);
    return name[0].name;
  };

  const deletePartner = async (id, idx) => {
    await api.delete(`/partners/${id}`);
    setPartners(partners.splice(idx, 1));
    toast.success("Parceiro deletado com sucesso");
  };

  const deleteSell = async id => {
    await api.delete(`/sells/${id}`);
    toast.success("Venda deletada com sucesso");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  const handleDevolutionClickOpen = () => {
    setDevolutionOpen(true);
  };

  const handleDevolutionClose = value => {
    setDevolutionOpen(false);
  };

  return (
    <Container>
      <Appbar onClose={props.onClose.bind()} title={contract.contract_number} />
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          marginTop: "80px",
          marginBottom: "20px"
        }}
      >
        <Card>
          <strong>Data do contrato </strong>
          <p> {format(new Date(contract.created_at), "dd/MM/yyyy")} </p>
        </Card>
        <Card>
          <strong>Distribuidora </strong>
          <p> {contract.enterprises.corporate_name} </p>
        </Card>
        <Card>
          <strong>Armazém </strong>
          <p> {contract.storages.name} </p>
        </Card>
        <Card>
          <strong>Volume a carregar </strong>
          <p> {contract.to_load.toLocaleString()} </p>
        </Card>
        <Card>
          <strong>Valor a pagar </strong>
          <p>
            {contract.to_pay.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </p>
        </Card>
        <Card>
          <strong>Volume carregado </strong>
          <p>Rever</p>
        </Card>
        <Card>
          <strong>Valor pago </strong>
          <p>
            {(contract.total - contract.to_pay).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </p>
        </Card>
      </div>
      <GridContainer>
        <ListContainer>
          <Title variant="h5">Representantes do contrato</Title>
          <List style={{ width: "80%" }}>
            {!partners ? (
              <Title variant="h5">Não há nada para ser exibido</Title>
            ) : (
              partners.map((partner, idx) => (
                <ListItem key={partner.id}>
                  <ListItemText primary={getName(partner.partner_id)} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={e => deletePartner(partner.id, idx)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </ListContainer>

        <ListContainer>
          <Title variant="h5">Vendas</Title>

          <List style={{ width: "80%" }}>
            {!contract.sells ? (
              <Title variant="h2">Não há nada para ser exibido</Title>
            ) : (
              contract.sells.map((sell, idx) => (
                <ListItem key={sell.id}>
                  <ListItemText
                    primary={getName(sell.client_id)}
                    secondary={getSeller(sell.seller_id)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => history.push(`/sells/view/${sell.id}`)}
                    >
                      <Visibility  fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={e => deleteSell(sell.id, idx)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </ListContainer>
      </GridContainer>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          textAlign: "center",
          marginBottom: "-25px",
          marginTop: "auto"
        }}
      >
        <Card>
          <Title variant="h5" style={{ marginBottom: "0px !important" }}>
            Volume total do contrato
          </Title>
          <Title variant="h6" color="#333">
            {contract.volume.toLocaleString()}
          </Title>
        </Card>
        <Card>
          <Title variant="h5" style={{ marginBottom: "0px !important" }}>
            Valor total do contrato
          </Title>
          <Title variant="h6" color="#333">
            {contract.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </Title>
        </Card>
      </div>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <ActionButton variant="extended" onClick={handleClickOpen}>
          <Add />
          Adicionar Pagamento
        </ActionButton>
        <ActionButton variant="extended" onClick={handleDevolutionClickOpen}>
          Solicitar Devolução
        </ActionButton>
      </div>
      <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <ContractPayiment
          contractId={props.contract.id}
          handleClose={handleClose}
          getContract={getContract.bind()}
        />
      </Modal>
      <Modal
        open={devolutionOpen}
        onClose={handleDevolutionClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <ContractDevolution
          contractId={props.contract.id}
          handleClose={handleDevolutionClose}
          getContract={getContract.bind()}
        />
      </Modal>
    </Container>
  );
}
