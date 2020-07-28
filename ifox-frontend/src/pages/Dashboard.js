import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import { Dashboard } from "~/components/Layouts";
import { Container, Card, CardHeader, CardContent } from "~/components/styles";

import api from "~/services/api";

const Paragraph = styled.p`
  margin: 10px;
  color: ${(props) => (props.value < 0 ? "#FF2013" : "#444")};
  font-weight: ${(props) => (props.value < 0 ? "bold" : "500")};
  line-height: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

function Index() {
  const [contracts, setContracts] = useState();
  const [sells, setSells] = useState();
  const [totalContracts, setTotalContracts] = useState(0);
  const [profits, setProfits] = useState(0);
  const [custs, setCusts] = useState(0);
  const [sellsValue, setSellsValue] = useState(0);
  const [toPay, setToPay] = useState(0);
  const [paied, setPaied] = useState(0);

  useEffect(() => {
    if (!contracts) {
      getContracts();
    }

    if (!sells) {
      getSells();
    }

    if (contracts && sells) {
      let total = 0;
      let totalToPay = 0;
      let totalPaied = 0;
      let totalCust = 0;
      let sellValue = 0;

      contracts.map((item) => {
        totalCust += parseFloat(item.total_cust * item.volume);
        total += item.volume;
        totalToPay += item.to_pay;
        return (totalPaied += item.paied);
      });

      sells.map((item) => {
        let freigth = item.freigth !== null ? item.freigth : 0;
        return (sellValue += (item.sell_price - freigth) * item.volume);
      });

      console.log(sellValue, totalCust);

      setTotalContracts(total);
      setToPay(totalToPay);
      setPaied(totalPaied);
      setCusts(totalCust);
      setSellsValue(sellValue);
      setProfits(sellValue - totalCust);
    }
  }, [contracts, sells]);

  const getContracts = async () => {
    const response = await api.get("/contracts");
    setContracts(response.data);
  };

  const getSells = async () => {
    const response = await api.get("/sells");
    setSells(response.data);
  };

  const data = [
    {
      name: "Valores (R$)",
      Pago: paied,
      Deve: toPay,
      Total: paied + toPay,
    },
  ];

  const dataFinance = [
    {
      name: "Finanças",
      Custos: custs,
      Vendas: sellsValue,
      Lucros: profits,
    },
  ];

  return (
    <Dashboard>
      <Container>
        <Grid>
          <Card>
            <CardHeader title="Contratos" />
            <CardContent>
              <BarChart
                style={{ fontSize: "12px" }}
                width={200}
                height={150}
                data={data}
                margin={{
                  top: -5,
                  right: 0,
                  left: 0,
                  bottom: 25,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Pago" fill="#3C26FF" barSize={30} />
                <Bar dataKey="Deve" fill="#FF2013" barSize={30} />
                <Bar dataKey="Total" fill="#82fa56" barSize={30} />
              </BarChart>
              <Paragraph>
                <strong>Total a pagar:</strong> R$ {toPay.toLocaleString()}
              </Paragraph>
              <Paragraph>
                <strong>Total pago: </strong>R$ {paied.toLocaleString()}
              </Paragraph>
              <Paragraph>
                <strong>Total em litros: </strong>
                {totalContracts.toLocaleString()}
              </Paragraph>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Finanças" />
            <CardContent>
              <BarChart
                style={{ fontSize: "12px" }}
                width={200}
                height={150}
                data={dataFinance}
                margin={{
                  top: -5,
                  right: 0,
                  left: 0,
                  bottom: 25,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Custos" fill="#3C26FF" barSize={30} />
                <Bar dataKey="Vendas" fill="#FF2013" barSize={30} />
                <Bar dataKey="Lucros" fill="#82fa56" barSize={30} />
              </BarChart>
              <Paragraph>
                <strong>Custos Totais:</strong> R$ {custs.toLocaleString()}
              </Paragraph>
              <Paragraph>
                <strong>Vendas Totais: </strong>R$ {sellsValue.toLocaleString()}
              </Paragraph>
              <Paragraph value={profits}>
                <strong>Lucro / Prejuízo: </strong> R$
                {profits.toLocaleString()}
              </Paragraph>
            </CardContent>
          </Card>
        </Grid>
        <Card>
          <CardHeader title="Estoques" />
          <Grid>
            {console.log(contracts)}
            {contracts &&
              contracts.map((contract) => (
                <Card>
                  <Paragraph>
                    <strong>Contrato: </strong>
                    {contract.contract_number.toUpperCase()}
                  </Paragraph>
                  <Paragraph>
                    <strong>Volume do contrato: </strong>
                    {contract.volume.toLocaleString()}
                  </Paragraph>
                  <Paragraph>
                    <strong>Local de carregamento: </strong>
                    {contract.storages.name.toUpperCase()}
                  </Paragraph>
                  <Paragraph>
                    <strong>Pago: </strong>
                    {contract.paied.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Paragraph>
                  <Paragraph>
                    <strong>Falta pagar: </strong>
                    {contract.to_pay.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Paragraph>
                  <Paragraph value={contract.to_load}>
                    <stront>Disponível para carregamento: </stront>
                    {contract.to_load.toLocaleString()}
                  </Paragraph>
                </Card>
              ))}
          </Grid>
        </Card>
      </Container>
    </Dashboard>
  );
}

export default Index;
