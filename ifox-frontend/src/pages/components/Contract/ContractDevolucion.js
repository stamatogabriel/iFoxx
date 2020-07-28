import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Container,
  Input,
  Button,
  Loading,
  Title,
  theme,
} from "~/components/styles";
import {
  ThemeProvider,
} from "@material-ui/core";

import api from "~/services/api";

export default function ContractDevolution(props) {
  const [volume, setVolume] = useState();
  const [isLoading, setLoading] = useState();

  const handlePayiment = async () => {
    setLoading(true)
    try {
      await api.post(`contracts/${props.contractId}/devolution`, {
        volume,
      })
      props.getContract()
      props.handleClose()
      toast.success('Solicitação de devolução lançada com sucesso')
    } catch(err) {
      setLoading(false)
      console.log(err)
      toast.error('Algo deu errado. Tente novamente mais tarde')
    }
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Solicitando Devolução</Title>
        <Input
          variant="outlined"
          label="Volume a ser devolvido"
          value={volume}
          onChange={e => setVolume(e.target.value)}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Button color="primary" variant="contained" onClick={handlePayiment}>
            Salvar
          </Button>
        )}
      </ThemeProvider>
    </Container>
  );
}
