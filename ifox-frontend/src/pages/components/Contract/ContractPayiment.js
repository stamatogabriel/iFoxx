import React, { useState } from "react";
import NumberFormat from "~/components/NumberFormat";
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

export default function ContractPayiment(props) {
  const [payment, setPayment] = useState();
  const [isLoading, setLoading] = useState();

  const handlePayiment = async () => {
    setLoading(true)
    try {
      await api.post(`contracts/${props.contractId}/payiment`, {
        value: payment,
      })
      props.getContract()
      props.handleClose()
      toast.success('Pagamento lançado com sucesso')
    } catch(err) {
      setLoading(false)
      console.log(err)
      toast.error('Algo deu errado. Tente novamente mais tarde')
    }
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title variant="h4">Adicionando pagamento</Title>
        <Input
          variant="outlined"
          label="Valor a ser pago"
          value={payment}
          onChange={e => setPayment(e.target.value)}
          InputProps={{
            inputComponent: NumberFormat
          }}
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
