import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  Container,
  FormControl,
  Button,
  Loading,
  Title,
  Chip,
  MenuItem,
  theme,
} from "~/components/styles";
import { InputLabel, Select, Input as MaterialInput } from "@material-ui/core";

import api from "~/services/api";

function getStyles(partner, partners, theme) {
  return {
    fontWeight:
      partners.indexOf(partner) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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

export default function AddEnterprise(props) {
  const [distributors, setDistributors] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [isLoading, setLoading] = useState();

  useEffect(() => {
      getInformations()
  }, [])

  async function getInformations() {
    const responseEnterprises = await api.get("/enterprises");

    const dataDistributors = responseEnterprises.data.filter(
      (distributor) =>
        distributor.type === "Cliente" && !distributor.enterprise_group_id
    );
    setDistributors(dataDistributors);
  }

  async function register() {
    try {
      setLoading(true);

      enterprises.map(async enterprise => {
        await api.put(`/enterprises/${enterprise}`, { enterprise_group_id: props.group.id })
      })
      props.getGroups();
      toast.success(`Rede foi atualizada com sucesso.`)
      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  const handleChangePartners = (event) => {
    setEnterprises(event.target.value);
  };

  function getCorporanteName(value) {
    const name = distributors.filter((distributor) => value === distributor.id);
    return name[0].corporate_name;
  }

  return (
    <Container>
      <Title variant="h4">Adicionando Empresas</Title>
      <FormControl>
        <InputLabel id="demo-mutiple-chip-label">Parceiros</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          variant="outlined"
          multiple
          value={enterprises}
          onChange={handleChangePartners}
          input={<MaterialInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip key={value} label={getCorporanteName(value)} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {distributors.map((distributor) => (
            <MenuItem
              key={distributor.id}
              value={distributor.id}
              style={getStyles(distributor, enterprises, theme)}
            >
              {distributor.corporate_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
