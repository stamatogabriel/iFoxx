import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { Dashboard } from "~/components/Layouts";
import {
  Container,
  AddButton,
  Modal,
  List,
  ListItem,
  IconButton,
} from "~/components/styles";
import { Add, Delete, Visibility } from "@material-ui/icons";
import styled from "styled-components";

import GroupRegister from "./components/Group/GroupRegister";
import AddEnterprise from "./components/Group/AddEnterprise";
import EnterpriseList from "./components/Group/EnterprisesList";

import api from "../services/api";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
`;

export default function Groups() {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState();

  useEffect(() => {
    getGroups();
  }, []);

  async function getGroups() {
    try {
      const response = await api.get("/groups");
      return setGroups(response.data);
    } catch (err) {
      return toast.error("Algo deu errado, tente novamente mais tarde.");
    }
  }

  async function deleteGroup(id) {
    try {
      await api.delete(`/groups/${id}`);
      toast.success("Rede deletada com sucesso");
      return getGroups();
    } catch (err) {
      return toast.error("Algo deu errado, tente novamente mais tarde.");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenAdd = (value) => {
    setGroup(value);
    setOpenAdd(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleCloseAdd = (value) => {
    setOpenAdd(false);
  };

  const handleClickOpenList = (value) => {
    setGroup(value);
    setOpenList(true);
  };

  const handleCloseList = (value) => {
    setOpenList(false);
  };

  return (
    <Dashboard>
      <Container>
        <AddButton onClick={handleClickOpen}>Adicionar Rede</AddButton>
        <List>
          {groups.map((group) => (
            <>
              <ListItem>
                <Wrapper>
                  {group.name.toUpperCase()}
                  <div>
                    <IconButton onClick={(e) => handleClickOpenAdd(group)} >
                      <Add />
                    </IconButton>
                    <IconButton onClick={(e) => deleteGroup(group.id)} >
                      <Delete fontSize="small" />
                    </IconButton>
                    <IconButton onClick={(e) => handleClickOpenList(group)} >
                      <Visibility  fontSize="small" />
                    </IconButton>
                  </div>
                </Wrapper>
              </ListItem>
            </>
          ))}
        </List>
      </Container>
      <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <GroupRegister
          handleClose={handleClose.bind()}
          getGroups={getGroups.bind()}
        />
      </Modal>
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        fullWidth={true}
        maxWidth="sm"
      >
        <AddEnterprise
          group={group}
          handleClose={handleCloseAdd.bind()}
          getGroups={getGroups.bind()}
        />
      </Modal>
      <Modal
        open={openList}
        onClose={handleCloseList}
        fullWidth={true}
        maxWidth="sm"
      >
        <EnterpriseList
          group={group}
          handleClose={handleCloseList.bind()}
          getGroups={getGroups.bind()}
        />
      </Modal>
    </Dashboard>
  );
}
