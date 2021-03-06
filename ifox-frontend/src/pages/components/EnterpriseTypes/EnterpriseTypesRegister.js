import React, { useState } from "react";
import { toast } from "react-toastify";

import { Container, Input, Button, Loading, Title } from "~/components/styles";

import api from "~/services/api";

export default function Register(props) {
  const [description, setDescription] = useState();
  const [isLoading, setLoading] = useState();

  async function register() {
    try {
      setLoading(true);
      await api.post("/types", { type: description });
      props.getTypes();
      toast.success(`Tipo ${description} foi cadastrado com sucesso.`);
      props.handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
    }
  }

  return (
    <Container>
      <Title variant="h4">Cadastro de tipo de empresa</Title>
      <Input
        label="Descrição do tipo"
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
      />
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
