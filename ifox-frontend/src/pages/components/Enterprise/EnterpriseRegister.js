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
  Chip,
} from "~/components/styles";

import NumberFormat from "~/components/NumberFormat";

import {
  ThemeProvider,
  Select,
  InputLabel,
  Input as MaterialInput,
} from "@material-ui/core";

import api from "~/services/api";
import Zipcode from "~/services/zipcode";

import {
  Cnpj as CnpjMask,
  Phone as PhoneMask,
  Cep as ZipcodeMask,
} from "~/components/Masks";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(partner, partners, theme) {
  return {
    fontWeight:
      partners.indexOf(partner) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function EnterpriseRegister(props) {
  const [isLoading, setLoading] = useState();
  const [corporate_name, setCorporateName] = useState();
  const [cnpj, setCnpj] = useState();
  const [ie, setIe] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [complement, setComplement] = useState();
  const [city, setCity] = useState();
  const [uf, setUf] = useState();
  const [zipcode, setzipcode] = useState("");
  const [contact, setContact] = useState();
  const [phone, setPhone] = useState();
  const [cellphone, setCellphone] = useState();
  const [weeklyVolume, setWeeklyVolume] = useState();
  const [store, setStore] = useState();
  const [credit, setCredit] = useState();
  const [storeList, setStoreList] = useState([]);
  const [types, setTypes] = useState([]);

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

        setStreet(address.data.logradouro);
        setNeighborhood(address.data.bairro);
        setCity(address.data.localidade);
        setUf(address.data.uf);
      }
    }

    async function getStores() {
      if (storeList.length === 0) {
        const response = await api.get("/storages");

        setStoreList(response.data);
      }
    }

    setLabelWidth(inputLabel.current.offsetWidth);

    getZipcode();
    getStores();
  }, [zipcode, storeList]);

  const handleChangeTypes = (event) => {
    setTypes(event.target.value);
  };

  function getTypeName(value) {
    const name = props.types.filter((type) => value === type.id);
    return name[0].type;
  }

  async function register() {
    try {
      setLoading(true);
      const enterprise = await api.post("/enterprises", {
        corporate_name,
        cnpj,
        ie,
        street,
        number,
        neighborhood,
        city,
        uf,
        zipcode,
        contact,
        phone,
        cellphone,
        storage_id: store,
        monthly_volume: parseFloat(weeklyVolume),
        credit: parseFloat(credit),
      });

      await types.map(async (type) =>
        await api.post("/enterprise_types", {
          type_id: type,
          enterprise_id: enterprise.data.id,
        })
      );

      props.getUser();
      toast.success(`Empresa ${corporate_name} foi cadastrada com sucesso.`);
      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  const storeChange = (event) => {
    setStore(event.target.value);
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h5">Cadastro de empresas</Title>
        <InputWrapper>
          <Input
            size="small"
            label="Razão Social"
            variant="outlined"
            onChange={(e) => setCorporateName(e.target.value)}
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            variant="outlined"
            onChange={(e) => setCnpj(CnpjMask(e.target.value))}
            value={cnpj}
            label="CNPJ"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            onChange={(e) => setIe(e.target.value)}
            label="Insc. Estadual"
            style={{ width: "49.5%", margin: 0 }}
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
        <FormControl>
          <InputLabel id="demo-mutiple-chip-label">Tipos de empresa</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            variant="outlined"
            multiple
            value={types}
            onChange={handleChangeTypes}
            input={<MaterialInput id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={getTypeName(value)} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {props.types.map((type) => (
              <MenuItem
                key={type.id}
                value={type.id}
                style={getStyles(type, types, theme)}
              >
                {type.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Input
          size="small"
          variant="outlined"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
          label="Contato"
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "5px 0 5px 0",
          }}
        >
          <Input
            size="small"
            variant="outlined"
            onChange={(e) => setPhone(PhoneMask(e.target.value))}
            value={phone}
            label="Telefone"
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            variant="outlined"
            onChange={(e) => setCellphone(PhoneMask(e.target.value))}
            value={cellphone}
            label="Celular"
            style={{ width: "49.5%", margin: 0 }}
          />
        </div>
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            label="Limite de Crédito"
            onChange={(e) => setCredit(e.target.value)}
            style={{ width: "49.5%", margin: 0 }}
            value={credit}
            InputProps={{
              inputComponent: NumberFormat,
            }}
          />
          <FormControl
            variant="outlined"
            size="small"
            style={{ width: "49.5%" }}
          >
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Onde costuma carregar
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={store}
              onChange={storeChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">
                <em>Selecione o armazém</em>
              </MenuItem>
              {storeList.length > 0 &&
                storeList.map((store) => (
                  <MenuItem value={store.id}>{store.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </InputWrapper>
        <Input
          variant="outlined"
          type="number"
          label="Volume semanal"
          size="small"
          onChange={(e) => setWeeklyVolume(e.target.value)}
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
