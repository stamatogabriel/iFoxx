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
  Chip
} from "~/components/styles";
import { ThemeProvider, Select, InputLabel, MenuItem, Input as MaterialInput } from "@material-ui/core";

import api from "~/services/api";
import Zipcode from "~/services/zipcode";

import {
  Cnpj as CnpjMask,
  Phone as PhoneMask,
  Cep as ZipcodeMask,
} from "~/components/Masks";

import NumberFormat from '~/components/NumberFormat'

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

export default function EnterpriseupdateEnterprise(props) {
  const [isLoading, setLoading] = useState();
  const [corporate_name, setCorporateName] = useState(
    props.enterprise.corporate_name
  );
  const [cnpj, setCnpj] = useState(props.enterprise.cnpj);
  const [ie, setIe] = useState(props.enterprise.ie);
  const [street, setStreet] = useState(props.enterprise.street);
  const [number, setNumber] = useState(props.enterprise.number);
  const [complement, setComplement] = useState(props.enterprise.complement);
  const [neighborhood, setNeighborhood] = useState(
    props.enterprise.neighborhood
  );
  const [city, setCity] = useState(props.enterprise.city);
  const [uf, setUf] = useState(props.enterprise.uf);
  const [zipcode, setzipcode] = useState(props.enterprise.zipcode);
  const [contact, setContact] = useState(props.enterprise.contact);
  const [phone, setPhone] = useState(props.enterprise.phone);
  const [cellphone, setCellphone] = useState(props.enterprise.cellphone);
  const [types, setTypes] = useState([]);
  const [weeklyVolume, setWeeklyVolume] = useState(
    props.enterprise.monthly_volume
  );
  const [store, setStore] = useState(props.enterprise.storage_id);
  const [credit, setCredit] = useState(props.enterprise.credit);
  const [storeList, setStoreList] = useState([]);

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    async function getZipcode() {
      if (zipcode) {
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
    }

    console.log(props)
    if (props.enterpriseTypes){
      let data = []
      const filter = props.enterpriseTypes.filter(type => type.enterprise_id === props.enterprise.id)
      filter.map(item => data.push(item.id))
      setTypes(data)
    }

    async function getStores() {
      if (storeList.length === 0) {
        const response = await api.get("/storages");

        setStoreList(response.data);
      }
    }

    setLabelWidth(inputLabel.current.offsetWidth);

    getStores();
    getZipcode();
  }, [props, props.enterprise.id, props.enterpriseTypes, storeList.length, zipcode]);

  const storeChange = (event) => {
    setStore(event.target.value);
  };

  async function updateEnterprise() {
    try {
      setLoading(true);
      await api.put(`/enterprises/${props.enterprise.id}`, {
        corporate_name,
        cnpj,
        ie,
        street,
        number,
        neighborhood,
        complement,
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
      props.getUser();
      toast.success(`Empresa ${corporate_name} foi atualizada com sucesso.`);
      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  const handleChangeTypes = (event) => {
    setTypes(event.target.value);
  };

  function getTypeName(value) {
    const name = props.types.filter((type) => value === type.id);
    return name[0].type;
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Editando {corporate_name}</Title>
        <Input
          size="small"
          label="Razão Social"
          value={corporate_name}
          variant="outlined"
          onChange={(e) => setCorporateName(e.target.value)}
        />
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            onChange={(e) => setCnpj(CnpjMask(e.target.value))}
            value={cnpj}
            label="CNPJ"
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            value={ie}
            variant="outlined"
            onChange={(e) => setIe(e.target.value)}
            label="Insc. Estadual"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            onChange={(e) => setzipcode(ZipcodeMask(e.target.value))}
            value={zipcode}
            label="CEP"
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            InputLabelProps={{
              shrink: street ? true : false,
            }}
            value={street}
            variant="outlined"
            onChange={(e) => setStreet(e.target.value)}
            label="Endereço"
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            type="number"
            variant="outlined"
            onChange={(e) => setNumber(e.target.value)}
            label="N°"
            value={number}
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            InputLabelProps={{
              shrink: neighborhood ? true : false,
            }}
            value={neighborhood}
            variant="outlined"
            onChange={(e) => setNeighborhood(e.target.value)}
            label="Bairro"
            style={{ width: "49.5%" }}
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
            style={{ width: "49.5%" }}
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

        <InputWrapper>
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
            style={{ width: "49.5%" }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            label="Limite de Crédito"
            onChange={e => setCredit(e.target.value)}
            value={credit}
            InputProps={{
              inputComponent: NumberFormat,
          }}
            style={{ width: "49.5%", margin: 0 }}
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
          label="Volume semanal"
          type="number"
          size="small"
          value={weeklyVolume}
          onChange={(e) => setWeeklyVolume(e.target.value)}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Button
            color="primary"
            onClick={updateEnterprise}
            variant="contained"
          >
            Salvar
          </Button>
        )}
      </ThemeProvider>
    </Container>
  );
}
