import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Container, InputLogin as Input, Title, BorderButton, Hr, Form } from "~/components/styles";
import { Dashboard } from "~/components/Layouts";

import { signInSuccess } from '~/store/modules/auth/actions'

import api from "~/services/api";

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  const [username, setName] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState(profile.password);
  const [newPassword, setNewPassword] = useState();

  async function update() {
    try {
      const user = await api.put(`/users/${profile.id}`, {
        username,
        email,
      });
       dispatch(signInSuccess(token, user.data))
      toast.success("Dados atualizados com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado, tente novamente mais tarde.");
    }
  }

  async function updatePass() {
    try {
      if (password !== newPassword) {
        return toast.error("As senhas Fnformadas devem ser iguais");
      }
      await api.put(`/users/${profile.id}`, {
        password,
      });

      toast.success("Senha atualizada com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado, tente novamente mais tarde.");
    }
  }

  return (
    <Dashboard>
      <Container>
        <Form autoComplete="off">
          <Title variant="h3">Atualizar Perfil</Title>
          <Input
            variant="outlined"
            label="Nome"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            name={"address " + Math.random()}
            onChange={(e) => setEmail(e.target.value)}
          />
          <BorderButton colorButton="green" onClick={update}>
            Atualizar dados
          </BorderButton>
          <Hr />
          <Input
            variant="outlined"
            label="Nova senha"
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            variant="outlined"
            label="Confirmar nova senha"
            type="password"

            onChange={(e) => setNewPassword(e.target.value)}
          />
          <BorderButton colorButton="green" onClick={updatePass}>
            Atualizar Senha
          </BorderButton>
        </Form>
      </Container>
    </Dashboard>
  );
}
