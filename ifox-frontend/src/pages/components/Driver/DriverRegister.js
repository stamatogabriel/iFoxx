import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Container,
  Input,
  Button,
  Loading,
  Title,
  theme,
  InputWrapper
} from "~/components/styles";
import {
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import api from "~/services/api";

import { Cpf as CpfMask, Phone as PhoneMask } from "~/components/Masks";

export default function DriverRegister(props) {
  const [isLoading, setLoading] = useState();
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [cnh, setCnh] = useState("");
  const [cnh_category, setCategory] = useState();
  const [phone, setPhone] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});

  async function handleOpen() {
    setError({
      name: !name ? true : false,
      rg: !rg ? true : false,
      cpf: !cpf ? true : false,
      phone: !phone ? true : false
    });

    if (name && rg && cpf && phone && cnh.length > 0) {
        register()
    }

    if (
      error.name === false &&
      error.rg === false &&
      error.cpf === false &&
      error.phone === false
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  function handleConfirm() {
    handleClose();
    register();
  }

  async function register() {
    try {
      setLoading(true);
      await api.post("/drivers", { name, cpf, phone, rg, cnh, cnh_category });
      props.getUser();
      toast.success(`Motorista ${name} foi cadastrado com sucesso.`);
      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Cadastro de motoristas</Title>
        <Input
          error={error.name}
          helperText={error.name ? "Por favor, preencha este campo!" : ""}
          size="small"
          label="Nome completo"
          variant="outlined"
          onChange={e => setName(e.target.value)}
        />
        <InputWrapper>
        <Input
            error={error.cpf}
            helperText={error.cpf ? "Por favor, preencha este campo!" : ""}
            size="small"
            variant="outlined"
            onChange={e => setCpf(CpfMask(e.target.value))}
            value={cpf}
            label="CPF"
            style={{ width: "49.5%" }}
          />
          <Input
            error={error.rg}
            helperText={error.rg ? "Por favor, preencha este campo!" : ""}
            size="small"
            variant="outlined"
            onChange={e => setRg(e.target.value)}
            label="RG"
            style={{ width: "49.5%", marginTop: 0 }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            size="small"
            variant="outlined"
            onChange={e => setCnh(e.target.value)}
            label="CNH"
            style={{ width: "49.5%" }}
          />
          <Input
            size="small"
            variant="outlined"
            onChange={e => setCategory(e.target.value)}
            label="Categoria CNH"
            style={{ width: "49.5%", marginTop: 0 }}
          />
        </InputWrapper>
        <Input
          error={error.phone}
          helperText={error.phone ? "Por favor, preencha este campo!" : ""}
          size="small"
          variant="outlined"
          onChange={e => setPhone(PhoneMask(e.target.value))}
          value={phone}
          label="Telefone"
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Button
            colorButton="primary"
            onClick={handleOpen}
            variant="contained"
          >
            Salvar
          </Button>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Vecê está criando um motorista sem CNH"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se você clicar em continuar, o motorista será cadastrado sem o
              número de CNH. Você poderá acrescentar posteriormente novamente,
              editando o cadastro do motorista.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleConfirm}
              colorButton="warn"
              variant="contained"
            >
              Continuar
            </Button>
            <Button
              onClick={handleClose}
              colorButton="error"
              variant="contained"
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Container>
  );
}
