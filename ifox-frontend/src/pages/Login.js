import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import { signInRequest } from "~/store/modules/auth/actions";

import { Grid } from "@material-ui/core";

import Logo from "~/assets/fox.png";

import { InputLogin as Input, Loading, Button, Title, Form } from "~/components/styles";

const CustomGrid = styled(Grid)`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 100%;
`;

const Image = styled.img`
  height: 45%;
`;

export default function Login(props) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [windowWidth, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [windowWidth])

  async function handleSignIn() {
    if (!email || !password)
      return toast.error("Preencha os campos de email e senha para continuar");

    try {
      dispatch(signInRequest(email, password));
    } catch (err) {
      toast.error("Houve um problema com o login, verifique suas credenciais.");
    }
  }
  return (
    <CustomGrid container>
      {window.innerWidth > 960 && (
        <CustomGrid item lg={6} md={6}>
          <Image src={Logo} alt="iFoxx" />
        </CustomGrid>
      )}
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Form>
          <LoginContainer>
            <Title variant="h2"> Login </Title>
            <Title variant="body1"> Entre com seu email </Title>
          </LoginContainer>
          <Input
            inputProps={{  }}
            label="Email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            type="text"
            variant="outlined"
          />
          <Input
            style={{ input: { textTransform: 'none !important' } }}
            label="Senha"
            name="password"
            onChange={e => setPassword(e.target.value)}
            type="password"
            variant="outlined"
          />
          {loading ? (
            <Loading />
          ) : (
            <Button
              color="primary"
              onClick={handleSignIn}
              size="large"
              variant="contained"
            >
              Entrar
            </Button>
          )}
        </Form>
      </Grid>
    </CustomGrid>
  );
}
