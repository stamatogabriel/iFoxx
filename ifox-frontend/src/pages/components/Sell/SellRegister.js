import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import {
  Container,
  Input,
  Button,
  Loading,
  Title,
  FormControl,
  InputWrapper,
  MenuItem,
} from "~/components/styles";
import {
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import NumberFormat from "~/components/NumberFormat";

import api from "~/services/api";

export default function SellerRegister(props) {
  const [isLoading, setLoading] = useState();
  const [contracts, setContracts] = useState([]);
  const [clients, setClients] = useState([]);
  const [sellPrice, setSellPrice] = useState();
  const [volume, setVolume] = useState();
  const [comission, setComission] = useState();
  const [typeFreigth, setTypeFreigth] = useState();
  const [sellerSell, setSellerSell] = useState();
  const [clientSell, setClientSell] = useState();
  const [contractSell, setContractSell] = useState();
  const [isGroup, setIsGroup] = useState();
  const [groups, setGroups] = useState([]);

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(async () => {
    getContracts();
    const data = await getClients();
    setGroups(props.groups);
    setClients(data);
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [props.enterprises, props.groups]);

  async function getContracts() {
    const response = await api.get("contracts");

    return setContracts(response.data);
  }

  async function getClients() {
    const types = await api.get("types");
    const clientType = types.data.find(
      (item) => item.type.toLowerCase() === "cliente"
    );

    const enterpriseTypes = await api.get("enterprise_types");
    const response = enterpriseTypes.data.filter(
      (item) => item.type_id === clientType.id
    );

    let clients = [];

    for (let i = 0; i < response.length; i++) {
      clients.push(
        props.enterprises.find((item) => item.id === response[i].enterprise_id)
      );
    }

    return clients;
  }

  async function register() {
    setLoading(true);
    try {
      if (contractSell) {
        const response = await api.post(`/contracts/${contractSell}/sells`, {
          seller_id: sellerSell,
          client_id: !isGroup ? clientSell : 1,
          group_id: isGroup ? clientSell : null,
          sell_price: sellPrice,
          comission,
          type_freigth: typeFreigth,
          volume,
        });

        if (response.error) {
          return toast.error(response.error.message);
        } else {
          toast.success("Venda cadastrada com sucesso.");
        }
      } else {
        const response = await api.post("/sells", {
          seller_id: sellerSell,
          client_id: !isGroup ? clientSell : 1,
          group_id: isGroup ? clientSell : null,
          sell_price: sellPrice,
          comission,
          type_freigth: typeFreigth,
          volume,
        });
        if (response.error) {
          return toast.error(response.error.message);
        } else {
          toast.success("Venda cadastrada com sucesso.");
        }
      }

      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err.error);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }

    props.handleClose();
  }
  const handleChange = (event) => {
    setSellerSell(event.target.value);
  };

  const handleClientChange = (event) => {
    setClientSell(event.target.value);
  };

  const handleContractChange = (event) => {
    setContractSell(event.target.value);
  };

  const handleContractFreigth = (event) => {
    setTypeFreigth(event.target.value);
  };

  return (
    <Container>
      <Title variant="h4">Nova Venda</Title>
      <InputWrapper>
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
              contracts.map((contract) => (
                <MenuItem value={contract.id}>
                  {contract.contract_number}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          style={{ width: "49.5%", marginTop: 0 }}
        >
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Vendedor
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={sellerSell}
            onChange={handleChange}
            labelWidth={labelWidth}
          >
            <MenuItem value="">
              <em>Selecione o vendedor</em>
            </MenuItem>
            {props.sellers &&
              props.sellers.map((seller) => (
                <MenuItem value={seller.id}>{seller.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </InputWrapper>
      <InputWrapper>
        <FormControlLabel
          style={{ color: "#555", width: "49.5%", marginTop: 0 }}
          control={
            <Checkbox
              color="primary"
              checked={isGroup}
              onChange={(e) => setIsGroup(!isGroup)}
            />
          }
          label="Venda para Redes"
        />
        <FormControl
          variant="outlined"
          size="small"
          style={{ width: "49.5%", marginTop: 0 }}
        >
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            {!isGroup ? "Cliente" : "Rede"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={clientSell}
            onChange={handleClientChange}
            labelWidth={labelWidth}
          >
            <MenuItem value="">
              <em>{`Selecione ${!isGroup ? "o cliente" : "a rede"}`}</em>
            </MenuItem>
            {clients &&
              !isGroup &&
              clients.map((client) => (
                <MenuItem value={client.id}>{client.corporate_name}</MenuItem>
              ))}
            {groups &&
              isGroup &&
              groups.map((client) => (
                <MenuItem value={client.id}>{client.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </InputWrapper>
      <InputWrapper>
        <FormControl
          style={{ width: "49.5%", marginTop: 0 }}
          variant="outlined"
          size="small"
        >
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Tipo do frete
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={typeFreigth}
            onChange={handleContractFreigth}
            labelWidth={labelWidth}
          >
            <MenuItem value="">
              <em>Selecione o tipo do frete</em>
            </MenuItem>
            <MenuItem value="CIF">CIF</MenuItem>
            <MenuItem value="FOB">FOB</MenuItem>
          </Select>
        </FormControl>
        <Input
          style={{ width: "49.5%", marginTop: 0 }}
          size="small"
          variant="outlined"
          label="Preço por litro"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          InputProps={{
            inputComponent: NumberFormat,
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          style={{ width: "49.5%", marginTop: 0 }}
          size="small"
          variant="outlined"
          label="Comissão do vendedor"
          value={comission}
          onChange={(e) => setComission(e.target.value)}
          InputProps={{
            inputComponent: NumberFormat,
          }}
        />
        <Input
          style={{ width: "49.5%", marginTop: 0 }}
          size="small"
          variant="outlined"
          label="Volume"
          type="number"
          inputProps={{ min: "0", step: "10" }}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </InputWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <Button color="primary" onClick={register} variant="contained">
          Salvar
        </Button>
      )}
    </Container>
  );
}
