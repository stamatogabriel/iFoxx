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
import { ThemeProvider, Select, InputLabel } from "@material-ui/core";

import api from "~/services/api";
import Zipcode from "~/services/zipcode";

import { Phone as PhoneMask, Cep as ZipcodeMask } from "~/components/Masks";

export default function StorageRegister(props) {
  const [isLoading, setLoading] = useState();
  const [name, setName] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [city, setCity] = useState();
  const [uf, setUf] = useState();
  const [zipcode, setzipcode] = useState("");
  const [contact, setContact] = useState();
  const [phone, setPhone] = useState();
  const [type, setType] = useState();
  const [notes, setNotes] = useState();
  const [chargeType, setChargeType] = useState();
  const [openingHours, setOpeningHours] = useState();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    async function getZipcode() {
      const newZipcode = zipcode.replace(".", "").replace("-", "");

      if (newZipcode.length === 8) {
        const address = await Zipcode.get(`/${newZipcode}/json`);

        if (address.data.erro === true) {
          return toast.error(
            "CEP não encontrado. Por favor, verifique e tente novamente."
          );
        }
        console.log(address);
        setStreet(address.data.logradouro);
        setNeighborhood(address.data.bairro);
        setCity(address.data.localidade);
        setUf(address.data.uf);
      }
    }
    setLabelWidth(inputLabel.current.offsetWidth);
    getZipcode();
  }, [zipcode]);

  const handleChange = event => {
    setType(event.target.value);
  };

  const handleChangeCharge = event => {
    setChargeType(event.target.value);
  };

  async function register() {
    try {
      setLoading(true);
      await api.post("/storages", {
        name,
        street,
        number,
        neighborhood,
        city,
        uf,
        zipcode,
        contact,
        phone,
        type
      });
      props.getUser();
      toast.success(`Armazém ${name} foi cadastrada com sucesso.`);
      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Cadastro de armazéns</Title>
        <InputWrapper>
          <Input
            style={{ width: "49.5%" }}
            size="small"
            label="Nome"
            variant="outlined"
            onChange={e => setName(e.target.value)}
          />
          <FormControl
            variant="outlined"
            size="small"
            style={{ width: "49.5%" }}
          >
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Tipo da empresa
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={type}
              onChange={handleChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">
                <em>Selecione o tipo de empresa</em>
              </MenuItem>
              <MenuItem value="Base">Base</MenuItem>
              <MenuItem value="Usina">Usina</MenuItem>
            </Select>
          </FormControl>
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            onChange={e => setzipcode(ZipcodeMask(e.target.value))}
            value={zipcode}
            label="CEP"
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            
            InputLabelProps={{
              shrink: street ? true : false
            }}
            value={street}
            variant="outlined"
            onChange={e => setStreet(e.target.value)}
            label="Endereço"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            onChange={e => setNumber(e.target.value)}
            label="N°"
            inputProps={{ min: "0" }}
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            
            InputLabelProps={{
              shrink: neighborhood ? true : false
            }}
            value={neighborhood}
            variant="outlined"
            onChange={e => setNeighborhood(e.target.value)}
            label="Bairro"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            
            InputLabelProps={{
              shrink: city ? true : false
            }}
            value={city}
            variant="outlined"
            onChange={e => setCity(e.target.value)}
            label="Cidade"
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            
            InputLabelProps={{
              shrink: uf ? true : false
            }}
            value={uf}
            variant="outlined"
            onChange={e => setCity(e.target.value)}
            label="Estado"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            onChange={e => setContact(e.target.value)}
            value={contact}
            label="Contato"
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            variant="outlined"
            onChange={e => setPhone(PhoneMask(e.target.value))}
            value={phone}
            label="Telefone"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
        <FormControl
            variant="outlined"
            size="small"
            style={{ width: "39%" }}
          >
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Tipo de carregamento
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={chargeType}
              onChange={handleChangeCharge}
              labelWidth={labelWidth}
            >
              <MenuItem value="">
                <em>Selecione o tipo de carregamento</em>
              </MenuItem>
              <MenuItem value="Base">Ordem de chegada</MenuItem>
              <MenuItem value="Usina">Agendamento</MenuItem>
            </Select>
          </FormControl>
        <Input
          size="small"
          variant="outlined"
          onChange={e => setOpeningHours(e.target.value)}
          value={openingHours}
          label="Horário de funcionamento"
          style={{ width: "60%", margin: 0 }}
        />
</InputWrapper>
        <Input
          size="small"
          multiline
          variant="outlined"
          onChange={e => setNotes(e.target.value)}
          value={notes}
          label="Observaçoes"
          style={{ margin: 0 }}
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
