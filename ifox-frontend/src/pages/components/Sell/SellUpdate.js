import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import {
  Container,
  Input,
  Button,
  Loading,
  Title,
  theme,
  FormControl,
  MenuItem
} from "~/components/styles";
import { ThemeProvider, InputLabel, Select } from "@material-ui/core";
import NumberFormat from "~/components/NumberFormat";

import api from "~/services/api";

export default function SellerRegister(props) {
  const [isLoading, setLoading] = useState();
  const [sellers, setSellers] = useState([]);
  const [clients, setClients] = useState([]);
  const [sellPrice, setSellPrice] = useState(props.sell.sell_price);
  const [volume, setVolume] = useState(props.sell.volume)
  const [sellerSell, setSellerSell] = useState(props.sell.seller_id);
  const [clientSell, setClientSell] = useState(props.sell.client_id);

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    getSellers();
    getClients();
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const getSellers = async () => {
    const response = await api.get("/sellers");

    setSellers(response.data);
  };

  const getClients = async () => {
    const response = await api.get("/enterprises");
    const data = response.data.filter(item => item.type === "Cliente");

    setClients(data);
  };

  async function register() {
    try {
      setLoading(true);
      await api.post(`/contracts/${props.contractId}/sells`, {
        seller_id: sellerSell,
        client_id: clientSell,
        sell_price: sellPrice,
        volume
      });
      toast.success("Venda cadastrada com sucesso.");
      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  const handleChange = event => {
    setSellerSell(event.target.value);
  };

  const handleClientChange = event => {
    setClientSell(event.target.value);
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Nova Venda</Title>
          <FormControl variant="outlined" size="small">
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
              {sellers &&
                sellers.map(seller => (
                  <MenuItem value={seller.id}>{seller.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Cliente
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={clientSell}
              onChange={handleClientChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">
                <em>Selecione o cliente</em>
              </MenuItem>
              {clients &&
                clients.map(client => (
                  <MenuItem value={client.id}>{client.corporate_name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <Input
            size="small"
            variant="outlined"
            label="Preço por litro"
            value={sellPrice}
            onChange={e => setSellPrice(e.target.value)}
            InputProps={{
              inputComponent: NumberFormat
            }}
          />
          <Input
            size="small"
            variant="outlined"
            label="Volume"
            type="number"
            inputProps={{ min: "0", step: "10" }}
            value={volume}
            onChange={e => setVolume(e.target.value)}
          />
        {isLoading ? (
          <Loading />
        ) : (
          <Button color="primary" onClick={register} variant="contained">
            Salvar
          </Button>
        )}
      </ThemeProvider>
    </Container>
  );
}
