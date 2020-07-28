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
  MenuItem
} from "~/components/styles";
import { ThemeProvider, InputLabel, Select } from "@material-ui/core";

import api from "~/services/api";

export default function OrderRegister(props) {
  const [isLoading, setLoading] = useState();
  const [volume, setVolume] = useState();
  const [ocNumber, setOcNumber] = useState();
  const [driverOrder, setDriverOrder] = useState();
  const [truckOrder, setTruckOrder] = useState();
  const [firstChart, setFirstChart] = useState();
  const [secondChart, setSecondChart] = useState();
  const [haveChart, setHaveChart] = useState(false);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  async function register() {
    const sell = props.sells.find(item => item.id === props.sellId);

    console.log(sell.volume, volume);
    if (Number(sell.volume) < volume) {
      return toast.error("Volume da ordem é maior que o volume da venda");
    }

    const truck = props.trucks.find(item => item.id === truckOrder);

    if (haveChart) {
      const chartOrder = props.charts.find(item => item.id === firstChart);
      const chartSecondOrder = props.charts.find(
        item => item.id === secondChart
      );
      if (
        Number(chartOrder.max_volume) + Number(chartSecondOrder.max_volume) <
        Number(volume)
      ) {
        return toast.error("O volume da ordem é maior que o do caminhão");
      }
    }

    if (Number(truck.max_volume) < Number(volume)) {
      return toast.error("O volume da ordem é maior que o do caminhão");
    }

    try {
      setLoading(true);
      await api.post(`/contracts/${sell.contract_id}/sells/${sell.id}/orders`, {
        oc_number: ocNumber,
        id_driver: driverOrder,
        id_truck: truckOrder,
        id_first_chart: firstChart,
        id_second_chart: secondChart,
        volume
      });
      toast.success("Ordem cadastrada com sucesso.");
      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  const handleChange = event => {
    setDriverOrder(event.target.value);
  };

  const handleTruckChange = event => {
    setTruckOrder(event.target.value);
    const truck = props.trucks.find(truck => truck.id === event.target.value);
    if (truck.truck_type === "Cavalo") {
      return setHaveChart(true);
    }
  };

  const handleFirstChart = event => {
    setFirstChart(event.target.value);
  };

  const handleSecondChart = event => {
    setSecondChart(event.target.value);
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Nova Ordem</Title>
        <Input
          size="small"
          variant="outlined"
          value={ocNumber}
          onChange={e => setOcNumber(e.target.value)}
          label="OC da Distribuidora"
        />
        <FormControl variant="outlined" size="small">
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
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
              props.drivers.map(driver => (
                <MenuItem value={driver.id} key={driver.id}>
                  {driver.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
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
              props.trucks.map(truck => (
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
                  props.charts.map(chart => (
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
                  props.charts.map(chart => (
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
