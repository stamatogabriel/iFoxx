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
  InputWrapper,
  MenuItem,
} from "~/components/styles";
import { ThemeProvider, InputLabel, Select } from "@material-ui/core";

import api from "~/services/api";

export default function OrderRegister(props) {
  const [isLoading, setLoading] = useState();
  const [volume, setVolume] = useState();
  const [sellOrder, setSellOrder] = useState();
  const [clientOrder, setClientOrder] = useState();
  const [ocNumber, setOcNumber] = useState();
  const [driverOrder, setDriverOrder] = useState();
  const [truckOrder, setTruckOrder] = useState();
  const [firstChart, setFirstChart] = useState();
  const [secondChart, setSecondChart] = useState();
  const [haveChart, setHaveChart] = useState(false);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [sell, setSell] = useState();
  const [group, setGroup] = useState();

  useEffect(() => {
    if (sellOrder) {
      const selected = props.sells.find((item) => item.id === sellOrder);
      setSell(selected);
    }

    if (sell && sell.group_id !== null) {
      const groupSelect = props.groups.find(
        (item) => item.id === sell.group_id
      );
      setGroup(groupSelect);
    }

    if (sell && sell.client_id !== null) {
      setClientOrder(sell.client_id);
    }

    setLabelWidth(inputLabel.current.offsetWidth);
  }, [props.groups, props.sells, sell, sellOrder, group]);

  async function register() {
    if (Number(sell.volume) < volume) {
      return toast.error("Volume da ordem é maior que o volume da venda");
    }

    const truck = props.trucks.find((item) => item.id === truckOrder);

    if (haveChart) {
      const chartOrder = props.charts.find((item) => item.id === firstChart);
      const chartSecondOrder = props.charts.find(
        (item) => item.id === secondChart
      );
      
      if (
        Number(chartOrder.max_volume) + Number(chartSecondOrder.max_volume) <
        Number(volume)
      ) {
        return toast.error("O volume da ordem é maior que o do caminhão");
      }
    }

    if (truck.max_volume && Number(truck.max_volume) < Number(volume)) {
      return toast.error("O volume da ordem é maior que o do caminhão");
    }

    try {
      setLoading(true);
      await api.post(`/contracts/${sell.contract_id}/sells/${sell.id}/orders`, {
        oc_number: ocNumber,
        sell_id: sellOrder,
        client_id: clientOrder,
        id_driver: driverOrder,
        id_truck: truckOrder,
        id_first_chart: firstChart,
        id_second_chart: secondChart,
        volume: volume,
      });
      props.handleClose();
      toast.success("Ordem cadastrada com sucesso.");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  const handleChange = (event) => {
    setDriverOrder(event.target.value);
  };

  const handleChangeSell = (event) => {
    setSellOrder(event.target.value);
  };

  const handleTruckChange = (event) => {
    setTruckOrder(event.target.value);
    const truck = props.trucks.find((truck) => truck.id === event.target.value);
    if (truck.truck_type === "Cavalo") {
      return setHaveChart(true);
    }
  };

  const handleFirstChart = (event) => {
    setFirstChart(event.target.value);
  };

  const handleSecondChart = (event) => {
    setSecondChart(event.target.value);
  };

  const getSellVolume = (id) => {
    const sell = props.sells.filter((item) => item.id === id)[0];
    
    if(sell.volume)
      return sell.volume;
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Nova Ordem</Title>
        <FormControl variant="outlined" size="small">
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Vendas
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={sellOrder}
            onChange={handleChangeSell}
            labelWidth={labelWidth}
          >
            <MenuItem value="">
              <em>Selecione uma venda</em>
            </MenuItem>
            {props.sells &&
              props.sells.map((sell) => (
                <MenuItem value={sell.id} key={sell.id}>
                  {sell.id}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {sellOrder && (
          <>
            <Title variant="h6">
              {getSellVolume(
                sellOrder
              ) && `Volume disponível para carregamento: ${getSellVolume(
                sellOrder
              ).toLocaleString("pt-BR")}`}
            </Title>
            <InputWrapper>
              {group && (
                <FormControl
                  style={{ color: "#555", width: "49%", marginTop: 0, marginRight: "10px !important" }}                  variant="outlined"
                  size="small"
                >
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  >
                    Clientes
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={clientOrder}
                    onChange={(e) => setClientOrder(e.target.value)}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value="">
                      <em>Selecione um cliente</em>
                    </MenuItem>
                    {group.enterprises &&
                      group.enterprises.map((client) => (
                        <MenuItem value={client.id} key={client.id}>
                          {client.corporate_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
              <Input
                style={group ? { color: "#555", width: "49%", marginTop: 0} : {}}
                size="small"
                variant="outlined"
                value={ocNumber}
                onChange={(e) => setOcNumber(e.target.value)}
                label="OC da Distribuidora"
              />
            </InputWrapper>
            <FormControl variant="outlined" size="small">
              <InputLabel
                ref={inputLabel}
                id="demo-simple-select-outlined-label"
              >
                Motorista
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={driverOrder}
                onChange={handleChange}
                labelWidth={labelWidth}
              >
                <MenuItem value="">
                  <em>Selecione o motorista</em>
                </MenuItem>
                {props.drivers &&
                  props.drivers.map((driver) => (
                    <MenuItem value={driver.id} key={driver.id}>
                      {driver.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small">
              <InputLabel
                ref={inputLabel}
                id="demo-simple-select-outlined-label"
              >
                Caminhão
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={truckOrder}
                onChange={handleTruckChange}
                labelWidth={labelWidth}
              >
                <MenuItem value="">
                  <em>Selecione o caminhão</em>
                </MenuItem>
                {props.trucks &&
                  props.trucks.map((truck) => (
                    <MenuItem value={truck.id}>{truck.license}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            {haveChart && (
              <InputWrapper>
                <FormControl variant="outlined" size="small">
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  >
                    Carreta
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={firstChart}
                    onChange={handleFirstChart}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value="">
                      <em>Selecione a carreta</em>
                    </MenuItem>
                    {props.charts &&
                      props.charts.map((chart) => (
                        <MenuItem value={chart.id}>{chart.license}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="small">
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  >
                    2a. Carreta
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={secondChart}
                    onChange={handleSecondChart}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value="">
                      <em>Selecione a 2a carreta</em>
                    </MenuItem>
                    {props.charts &&
                      props.charts.map((chart) => (
                        <MenuItem value={chart.id}>{chart.license}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </InputWrapper>
            )}
            <Input
              size="small"
              variant="outlined"
              label="Volume"
              type="number"
              min={0}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              inputProps={{ min: "0", step: "10" }}
            />
          </>
        )}
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
