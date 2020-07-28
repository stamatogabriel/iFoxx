import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { signOut } from "~/store/modules/auth/actions";

import {
  Button,
  withStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";

import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  Book,
  Description,
  Opacity,
  ExitToApp,
  ExpandLess,
  ExpandMore,
  LocalShipping,
  People,
  Business,
  BusinessCenter,
  ViewCarousel,
} from "@material-ui/icons";

import styles from "./styles";

import Fox from "~/assets/fox.svg";

function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  function handleSignOut() {
    dispatch(signOut());
  }

  const { classes } = props;

  return (
    <>
      <div className={classes.logoWrapper}>
        <Link className={classes.logoLink} to="/home">
          <img
            alt="Foxx logo"
            className={classes.logoImage}
            src={Fox}
            height="75px"
          />
        </Link>
      </div>
      <nav className={classes.root}>
        <Divider className={classes.logoDivider} />

        <List component="div" disablePadding>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/home"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            />
          </ListItem>

          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/users"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Usuários"
            />
          </ListItem>

          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            onClick={handleClick}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <Book />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Cadastros"
            />
            {open ? (
              <ExpandLess className={classes.listItemIcon} />
            ) : (
              <ExpandMore className={classes.listItemIcon} />
            )}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to="/trucks"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <LocalShipping />
                </ListItemIcon>
                <ListItemText
                  primary="Caminhões"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to="/drivers"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <People />
                </ListItemIcon>
                <ListItemText
                  primary="Motoristas"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to="/enterprises"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <Business />
                </ListItemIcon>
                <ListItemText
                  primary="Empresas"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to="/enterprise_type"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <Business />
                </ListItemIcon>
                <ListItemText
                  primary="Tipos de Empresa"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to="/groups"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <BusinessCenter />
                </ListItemIcon>
                <ListItemText
                  primary="Redes"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to="/storages"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <ViewCarousel />
                </ListItemIcon>
                <ListItemText
                  primary="Armazéns"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to="/sellers"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <People />
                </ListItemIcon>
                <ListItemText
                  primary="Vendedores"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to="/products"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <Opacity />
                </ListItemIcon>
                <ListItemText
                  primary="Produtos"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/contracts"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <Description />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Contratos"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/sells"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <Description />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Vendas"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/orders"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <Description />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Ordens"
            />
          </ListItem>
        </List>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleSignOut}
        >
          Sair
          <ExitToApp className={classes.rightIcon} />
        </Button>
      </nav>
    </>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
