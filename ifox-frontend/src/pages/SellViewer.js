/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { toast } from "react-toastify";

import { Container } from "~/components/styles";
import api from "~/services/api";
import Logo from "~/assets/fox.svg";

const Table = styled.table`
  border: 1px solid #999;
  border-radius: 5px;
  width: 100%;
  margin: 5px;
  padding: 10px;
  font-size: 12px;

  td {
    padding: 5px;
  }
`;

const TableHead = styled.th`
  width: 100%;
`;

const Wrapper = styled.div`
  border: 1px solid #999;
  border-radius: 5px;
  width: 95%;
  margin: 5px;
  padding: 20px;
`;

const Title = styled.td`
  font-weight: 700;
`;

const TitleTable = styled.tr`
  display: flex;
  align-items: center;
`;

const NotesWrapper = styled.div`
  border: 1px solid #999;
  border-radius: 5px;
  width: 100%;
  margin: 5px;
  padding: 10px;
`;

const Notes = styled.div`
  width: 100%;
  min-height: 100px;
`;

export default function SellViewer(props) {
  const [sell, setSell] = useState();
  const [client, setClient] = useState();

  useEffect(() => {
    getSell().then(() => window.print());
  }, []);

  async function getSell() {
    try {
      const response = await api.get(`/sells/${props.match.params.id}`);
      console.log(response.data);
      await getClient(response.data.client_id);
      return setSell(response.data);
    } catch (err) {
      return toast.error(
        "Algo deu errado. Por favor, tente novamente mais tarde."
      );
    }
  }

  async function getClient(id) {
    try {
      const response = await api.get(`/enterprises/${id}`);

      return setClient(response.data);
    } catch (err) {
      return toast.error(
        "Algo deu errado. Por favor, tente novamente mais tarde."
      );
    }
  }

  return (
    <Container>
      <Wrapper>
        <Table>
          <TableHead>
            <TitleTable>
              <td>
                <img src={Logo} alt="Foxx Assessoria" height='50px'/>
              </td>
              <td>
                <h1>
                  Pedido de Venda - No {!sell ? "Carregando ..." : sell.id}
                </h1>
              </td>
            </TitleTable>
            <tr>
              <td>Data da venda:</td>
              <td>
                {!sell
                  ? "Carregando ..."
                  : format(new Date(sell.created_at), "dd/MM/yyyy")}
              </td>
            </tr>
          </TableHead>
        </Table>
        <Table>
          <tbody>
            <tr>
              <Title>Cliente</Title>
              <td>{!client ? "Carregando ..." : client.corporate_name}</td>
              <Title>Bandeira</Title>
              <td>Implementar</td>
            </tr>
            <tr>
              <Title>Endereço</Title>
              <td>
                {!client
                  ? "Carregando ..."
                  : `${client.street}, ${client.number}`}
              </td>
              <Title>Bairro</Title>
              <td>{!client ? "Carregando ..." : client.neighborhood}</td>
            </tr>
            <tr>
              <Title>Cidade</Title>
              <td>{!client ? "Carregando ..." : client.city}</td>
              <Title>Estado</Title>
              <td>{!client ? "Carregando ..." : client.uf}</td>
            </tr>
            <tr>
              <Title>CNPJ</Title>
              <td>{!client ? "Carregando ..." : client.cnpj}</td>
              <Title>CEP</Title>
              <td>{!client ? "Carregando ..." : client.zipcode}</td>
            </tr>
            <tr>
              <Title>Insc. Estadual</Title>
              <td>{!client ? "Carregando ..." : client.ie}</td>
              <Title>Telefone</Title>
              <td>{!client ? "Carregando ..." : client.phone}</td>
            </tr>
          </tbody>
        </Table>
        <Table>
          <tbody>
            <tr>
              <Title>Volume</Title>
              <td>
                {!sell
                  ? "Carregando ..."
                  : `${sell.volume.toLocaleString()} LTS`}
              </td>
              <Title>Valor Unitário</Title>
              <td>
                {!sell
                  ? "Carregando ..."
                  : sell.sell_price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
              </td>
              <Title>Produto</Title>
              <td>teste</td>
            </tr>
          </tbody>
        </Table>
        <NotesWrapper>
          <Notes>
            <p>Obs: </p>
          </Notes>
          <div>
            <p>Assinatura: ___________________________</p>
          </div>
        </NotesWrapper>
      </Wrapper>
    </Container>
  );
}
