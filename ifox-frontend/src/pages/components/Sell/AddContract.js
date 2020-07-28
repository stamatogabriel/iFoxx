import React, { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "@material-ui/core";
import api from "~/services/api";
import { toast } from "react-toastify";
import {
  Container,
  Title,
  theme,
  FormControl,
  Button,
  MenuItem
} from "~/components/styles";
import { Select, InputLabel} from "@material-ui/core";

export default function AddContract(props) {
  const [contracts, setContracts] = useState([]);
  const [contractSell, setContractSell] = useState();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    getContracts();
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleContractChange = event => {
    setContractSell(event.target.value);
  };

  async function updateOrder() {
    try {
      const response = await api.put(`/sells/${props.sell.id}`, {
        contract_id: contractSell
      });

      if (response.data.error) {
        return toast.error(response.data.error.message);
      } else {
        props.close();
        return toast.success("Ordem atualizada com sucesso");
      }
    } catch (err) {
      console.log(err);
      return toast.error("Algo deu errado. Tente novamente mais tarde.");
    }
  }

  async function getContracts() {
    try {
      const response = await api.get("/contracts");
      return setContracts(response.data);
    } catch (err) {
      return toast.error(
        "Não foi possível carregar os contratos, tente novamente mais tarde"
      );
    }
  }

  function showVolume(id) {
    const contract = contracts.filter(item => item.id === id)[0];

    return contract.volume;
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Adicionando Contrato</Title>
        <FormControl
          variant="outlined"
          size="small"
          style={{ width: "49.5%", marginTop: 0 }}
        >
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Contrato
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={contractSell}
            onChange={handleContractChange}
            labelWidth={labelWidth}
          >
            <MenuItem value="">
              <em>Selecione o contrato</em>
            </MenuItem>
            {contracts &&
              contracts.map(contract => (
                <MenuItem value={contract.id}>
                  {contract.contract_number}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {contractSell && (
          <Title variant="h6">
            {`Volume do contrato ${showVolume(contractSell).toLocaleString()} litros`}
          </Title>
        )}
        <Button onClick={updateOrder}>Adicionar Contrato</Button>
      </ThemeProvider>
    </Container>
  );
}
