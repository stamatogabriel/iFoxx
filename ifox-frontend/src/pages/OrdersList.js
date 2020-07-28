import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow
} from "@material-ui/core";
import { Modal, IconButton, ActionButton, TableCell } from "~/components/styles";
import { Dashboard } from "~/components/Layouts";
import { Delete, Visibility } from "@material-ui/icons";
import { toast } from "react-toastify";

import history from '~/services/history';
import { Container } from "~/components/styles";
import api from "~/services/api";

import OrderRegister from "./components/Order/OrderRegister";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [charts, setCharts] = useState([]);
  const [sells, setSells] = useState([]);
  const [groups, setGroups] = useState()

  useEffect(() => {
    getLists();
    getSells();
    getOrders();
  }, []);

  async function getOrders() {
    const response = await api.get("orders");
    return setOrders(response.data);
  }

  async function getLists() {
    try {
      const response = await api.get("/vehicules");
      const trucksList = response.data.filter(
        item =>
          item.truck_type === "Toco" ||
          item.truck_type === "Truck" ||
          item.truck_type === "Bi-Truck" ||
          item.truck_type === "Cavalo"
      );

      const groupsList = await api.get('/groups')
      setGroups(groupsList.data)

      const chartsList = response.data.filter(
        item => item.truck_type === "Carreta"
      );

      setTrucks(trucksList);
      setCharts(chartsList);

      const responseDrivers = await api.get("/drivers");
      setDrivers(responseDrivers.data);
    } catch (err) {
      return toast.error(
        "Algo deu errado. Por favor, tente novamente mais tarde"
      );
    }
  }

  const getSells = async () => {
    const responseSells = await api.get("/sells");
    const sellsList = responseSells.data.filter(item => item.volume > 0);
    return setSells(sellsList);
  };

  const handleClickOpen = () => {
    return setOpen(true);
  };

  const handleClose = value => {
    getOrders();
    getSells();
    setOpen(false);
  };

  const getLicense = id => {
    const license = trucks.filter(item => item.id === id)[0];
    return license.license;
  };

  const getDriver = id => {
    const driver = drivers.filter(item => item.id === id)[0];
    return driver.name;
  };

  const deleteOrder = async id => {
    try {
      await api.delete(`/orders/${id}`);
      getSells();
      getOrders();
      return toast.success("Ordem Deletada com sucesso");
    } catch (err) {
      console.log(err);
      return toast.error(
        "Algo deu errado. Por favor, tente novamente mais tarde"
      );
    }
  };

  return (
    <Dashboard>
      <Container>
        <ActionButton
          colorButton="success"
          variant="extended"
          onClick={handleClickOpen}
        >
          Adicionar nova ordem
        </ActionButton>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ordem</TableCell>
              <TableCell>Ordem Distribuidora</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.oc_number}</TableCell>
                <TableCell>
                  {drivers.length === 0
                    ? "Carregando..."
                    : getDriver(order.id_driver)}
                </TableCell>
                <TableCell>
                  {trucks.length === 0
                    ? "Carregando..."
                    : getLicense(order.id_truck)}
                </TableCell>
                <TableCell>
                  <IconButton type="view" onClick={() => history.push(`/orders/view/${order.id}`)}>
                    <Visibility  fontSize="small" />
                  </IconButton>
                  {/* {<IconButton type="edit" onClick={e => {}}>
                  <Edit  fontSize="small" />
                </IconButton>} */}
                  <IconButton
                    type="delete"
                    onClick={e => deleteOrder(order.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>

      <Modal open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <OrderRegister
          handleClose={handleClose.bind()}
          sells={sells}
          drivers={drivers}
          trucks={trucks}
          charts={charts}
          groups={groups}
        />
      </Modal>
    </Dashboard>
  );
}
