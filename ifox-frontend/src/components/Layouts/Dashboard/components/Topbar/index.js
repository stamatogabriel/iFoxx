import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import classNames from "classnames";
import compose from "recompose/compose";
import PropTypes from "prop-types";

import { withStyles, IconButton, Toolbar, Avatar } from "@material-ui/core";

import { useSelector } from "react-redux";

import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";

import styles from "./styles";

function Topbar(props) {
  const profile = useSelector((state) => state.user.profile);
  const { classes, className, isSidebarOpen, onToggleSidebar } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <Fragment>
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={onToggleSidebar}
            variant="text"
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <div className={classes.avatar}>
            <Link to="/profile" className={classes.avatar}>
              <strong className={classes.user}>{profile.username}</strong>
              <Avatar />
            </Link>
          </div>
        </Toolbar>
      </div>
    </Fragment>
  );
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string,
};

Topbar.defaultProps = {
  onToggleSidebar: () => {},
};

export default compose(withRouter, withStyles(styles))(Topbar);
