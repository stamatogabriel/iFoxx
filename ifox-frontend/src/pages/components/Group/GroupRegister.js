import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  Container,
  Input,
  Button,
  Loading,
  Title,
  theme,
  InputWrapper,
} from "~/components/styles";

import { ThemeProvider } from "@material-ui/core";

import api from "~/services/api";
import Zipcode from "~/services/zipcode";

import { Phone as PhoneMask, Cep as ZipcodeMask } from "~/components/Masks";

export default function EnterpriseRegister(props) {
  const [isLoading, setLoading] = useState();
  const [name, setCorporateName] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [complement, setComplement] = useState();
  const [city, setCity] = useState();
  const [uf, setUf] = useState();
  const [zipcode, setzipcode] = useState("");
  const [phone, setPhone] = useState();

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

        setStreet(address.data.logradouro);
        setNeighborhood(address.data.bairro);
        setCity(address.data.localidade);
        setUf(address.data.uf);
      }
    }

    getZipcode();
  }, [zipcode]);

  async function register() {
    try {
      setLoading(true);
      await api.post("/groups", {
        name,
        street,
        number,
        neighborhood,
        uf,
        city,
        zipcode,
        phone,
      });
      props.getGroups();
      toast.success(`Rede ${name} foi cadastrada com sucesso.`);
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
        <Title variant="h5">Cadastro de redes</Title>
        <InputWrapper>
          <Input
            size="small"
            label="Nome da Rede"
            variant="outlined"
            onChange={(e) => setCorporateName(e.target.value)}
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            variant="outlined"
            onChange={(e) => setzipcode(ZipcodeMask(e.target.value))}
            value={zipcode}
            label="CEP"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            InputLabelProps={{
              shrink: street ? true : false,
            }}
            value={street}
            variant="outlined"
            onChange={(e) => setStreet(e.target.value)}
            label="Endereço"
            style={{ width: "49.5%", margin: 0 }}
          />
          <Input
            size="small"
            type="number"
            inputProps={{ min: "0" }}
            variant="outlined"
            onChange={(e) => setNumber(e.target.value)}
            label="N°"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            InputLabelProps={{
              shrink: neighborhood ? true : false,
            }}
            value={neighborhood}
            variant="outlined"
            onChange={(e) => setNeighborhood(e.target.value)}
            label="Bairro"
            style={{ width: "49.5%", margin: 0 }}
          />
          <Input
            size="small"
            variant="outlined"
            onChange={(e) => setComplement(e.target.value)}
            value={complement}
            label="Complemento"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            InputLabelProps={{
              shrink: city ? true : false,
            }}
            value={city}
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
            label="Cidade"
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            InputLabelProps={{
              shrink: uf ? true : false,
            }}
            value={uf}
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
            label="Estado"
            style={{ width: "49.5%", margin: 0 }}
          />
        </InputWrapper>
        <Input
          size="small"
          variant="outlined"
          onChange={(e) => setPhone(PhoneMask(e.target.value))}
          value={phone}
          label="Telefone"
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
