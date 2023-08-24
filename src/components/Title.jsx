import React, { useState } from "react";

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import Home from "./Home";
import { Assignment, LocalLibrary } from "@mui/icons-material";
const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

export default function Title() {
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [toggleView, setToggleView] = useState("home");

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
  const handleToggleChange = (e, newView) => {
    setToggleView(newView);
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
          <ToggleButtonGroup
            exclusive
            color="primary"
            value={toggleView}
            onChange={handleToggleChange}
            sx={{
              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "#d9d9db", // 選択されているアイテムの背景色を指定
                color: "black", // 選択されているアイテムのテキスト色を指定
              },
            }}
          >
            <ToggleButton
              value="home"
              aria-label="home"
              LinkComponent={Link}
              to="/"
              sx={{
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "#d9d9db", // ホバー時の背景色も指定（必要に応じて）
                },
                ml: 4,
                fontSize: 12,
              }}
            >
              <HomeIcon />
              home
            </ToggleButton>
            <ToggleButton
              value="subject"
              aria-label="subject"
              LinkComponent={Link}
              to="/subjects"
              sx={{
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "#d9d9db", // ホバー時の背景色も指定（必要に応じて）
                },
                ml: 4,
                fontSize: 12,
              }}
            >
              <LocalLibrary />
              subject
            </ToggleButton>
            <ToggleButton
              value="task"
              aria-label="task"
              LinkComponent={Link}
              to="/task"
              sx={{
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "#d9d9db", // ホバー時の背景色も指定（必要に応じて）
                },
                ml: 4,
                fontSize: 12,
              }}
            >
              <Assignment />
              task
            </ToggleButton>
          </ToggleButtonGroup>
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
