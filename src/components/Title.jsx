import React, { useState } from "react";

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

export default function Title() {
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const pageChange = (e) => {
    const { name } = e.target;
    navigation(name);
  };
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button
            variant="h6"
            underline="none"
            color="inherit"
            sx={{ fontSize: 24 }}
            LinkComponent={Link}
            to="/"
            // onClick={(e) => {
            //   pageChange(e);
            // }}
          >
            Adminater
          </Button>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Menu
              id="menu-app-bar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
              <MenuItem>
                <Button
                  name="/"
                  to="/"
                  LinkComponent={Link}
                  // onClick={(e) => {
                  //   pageChange(e);
                  // }}
                >
                  home
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  // onClick={(e) => {
                  //   pageChange(e);
                  // }}
                  to="/setting"
                  LinkComponent={Link}
                  name="/setting"
                >
                  setting
                </Button>
              </MenuItem>
            </Menu>
            <IconButton sx={rightLink} color="inherit" onMouseOver={handleMenu}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
