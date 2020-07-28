import React, { useState, useEffect } from "react";
import {
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  List,
  Title,
  ListItem,
  IconButton,
  AddButton,
  Modal,
} from "~/components/styles";
import { Dashboard } from "~/components/Layouts";
import { Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import { Container } from "~/components/styles";
import Search from "~/components/Search";
import api from "~/services/api";

import ProductRegister from "./components/Products/ProductRegister";
import ProductUpdate from './components/Products/ProductUpdate'

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [product, setProduct] = useState()

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  async function deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`);
      getProducts();
      toast.success("Produto deletado com sucesso");
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado. Por favor tente novamente mais tarde.");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenUpdate = (value) => {
    setProduct(value)
    setOpenEdit(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleCloseUpdate = (value) => {
    setOpenEdit(false);
  };

  return (
    <Dashboard>
      <Container>
        <Search />
        <AddButton onClick={handleClickOpen}> Adicionar Produto </AddButton>
        <List style={{ width: "80%" }}>
          {products.length === 0 ? (
            <Title variant="h2">Não há nada para ser exibido</Title>
          ) : (
            products.map((product) => (
              <ListItem key={product.id}>
                <ListItemText primary={product.description} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={(e) => handleClickOpenUpdate(product)}>
                    <Edit  fontSize="small" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => deleteProduct(product.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Container>
      <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <ProductRegister
          handleClose={handleClose.bind()}
          getProducts={getProducts.bind()}
        />
      </Modal>
      <Modal open={openEdit} onClose={handleCloseUpdate} fullWidth={true} maxWidth="sm">
        <ProductUpdate
          product={product}
          handleClose={handleCloseUpdate.bind()}
          getProducts={getProducts.bind()}
        />
      </Modal>
    </Dashboard>
  );
}
