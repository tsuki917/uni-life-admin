import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "eeeef0",
  border: "2px solid #000",
  boxShadow: 5,
  p: 4,
};
export const ChaRepRate = ({ data, name, set }) => {
  const [rate, setRate] = useState(0);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      reports: {
        rate: Number(rate),
        reportArray: data,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(rate);
  };
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Button variant="outlined" onClick={changeFlag} sx={{ ml: 1 }}>
        割合変更
      </Button>
      <Modal open={flag} onClose={changeFlag}>
        <Box sx={style}>
          <label>
            レポート割合
            <input
              type="number"
              value={rate}
              min="0"
              max="100"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </label>
          <Button onClick={onAddEvent}>割合変更</Button>
        </Box>
      </Modal>
    </Box>
  );
};
