import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
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
export const ChaSmaRate = ({ data, name, set }) => {
  const [rate, setRate] = useState(0);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      smallExam: {
        rate: Number(rate),
        smallExamArray: data,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(Number(rate));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Button variant="outlined" onClick={changeFlag} sx={{ ml: 1 }}>
        割合変更
      </Button>
      <Modal open={flag} onClose={changeFlag}>
        <Box sx={style}>
          <TextField
            label="小テスト割合"
            variant="outlined"
            type="number"
            value={rate}
            min="0"
            max="100"
            margin="normal"
            onChange={(e) => {
              setRate(e.target.value);
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
  );
};
