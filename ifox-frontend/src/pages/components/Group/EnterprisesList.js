import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import styled from "styled-components";

import {
  Container,
  List,
  ListItem,
  Title,
  IconButton,
} from "~/components/styles";

import { Delete } from "@material-ui/icons";

import api from "~/services/api";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
`;

export default function EnterprisesList(props) {
  const [enterprises, setEnterprises] = useState([]);

  useEffect(() => {
    getEnterprises();
  }, []);

  async function getEnterprises() {
    try {
      const response = await api.get("/enterprises");
      const data = response.data.filter(
        (item) =>
          item.type === "Cliente" && item.enterprise_group_id === props.group.id
      );
      return setEnterprises(data);
    } catch (err) {
      return toast.error("Algo deu errado, tente novamente mais tarde.");
    }
  }

  async function deleteEnterprise(id, index) {
    try {
      await api.put(`/enterprises/${id}`, { enterprise_group_id: null });

      await getEnterprises();
      
      toast.success(`Rede foi atualizada com sucesso.`);
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  return (
    <Container>
      <Title variant="h4">Integrantes da Rede {props.group.name}</Title>
      <List>
        {enterprises.map((item, idx) => (
          <ListItem>
            <Wrapper>
              {item.corporate_name}
              <IconButton onClick={e => deleteEnterprise(item.id, idx)} >
                <Delete fontSize="small" />
              </IconButton>
            </Wrapper>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
