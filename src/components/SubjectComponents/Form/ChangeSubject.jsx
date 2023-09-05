import { auth, db } from "../../../libs/fire";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "eeeef0",
  border: "2px solid #000",
  boxShadow: 5,
  p: 4,
  display: "flex",
  alignItems: "baseline",
  marginRight: 10,
};
const phonestyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "eeeef0",
  border: "2px solid #000",
  boxShadow: 5,
  p: 4,
  display: "flex",
  alignItems: "baseline",
  marginRight: 10,
};
export const ChangeSubject = ({ all, setAll, setSubject, change }) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };

  const onAddEvent = async () => {
    if (name) {
      const subjectsNewData = [];
      const test = collection(db, auth.currentUser.email);
      const q = await getDocs(test);
      console.log(q);
      q.forEach((ele) => {
        subjectsNewData.push(ele.data());
      });
      if (!subjectsNewData.find((sub) => sub.name === name)) {
        const newData = { ...all };
        newData.name = name;
        await setDoc(doc(db, auth.currentUser.email, name), newData);
        await deleteDoc(doc(db, auth.currentUser.email, all.name));
        changeFlag();
        setAll(newData);
        setSubject(name);
        change();
      } else {
        setMessage(
          <p style={{ color: "red" }}>既に存在する教科名には変更できません</p>
        );
      }
    } else {
      setMessage(<p style={{ color: "red" }}>教科名が未入力です</p>);
    }
  };
  return (
    <div>
      {isSmallScreen ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{ mt: 3, mb: 3, ml: 1 }}
              onClick={changeFlag}
              variant="outlined"
              size="small"
            >
              教科名変更
            </Button>
          </Box>
          <Modal open={flag} onClose={changeFlag}>
            <Box sx={phonestyle}>
              {message}
              <TextField
                required
                label="教科名"
                variant="outlined"
                maxLength="100"
                value={name}
                margin="normal"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                variant="outlined"
                onClick={onAddEvent}
                style={{ marginLeft: 20 }}
              >
                変更
              </Button>
            </Box>
          </Modal>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{ mt: 3, mb: 3, ml: 1 }}
              onClick={changeFlag}
              variant="outlined"
            >
              教科名変更
            </Button>
          </Box>
          <Modal open={flag} onClose={changeFlag}>
            <Box sx={style}>
              {message}
              <TextField
                required
                label="教科名"
                variant="outlined"
                maxLength="100"
                value={name}
                margin="normal"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                variant="outlined"
                onClick={onAddEvent}
                style={{ marginLeft: 20 }}
              >
                変更
              </Button>
            </Box>
          </Modal>
        </Box>
      )}
    </div>
  );
};
