import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
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
};

export const ChaFinRate = ({ data, name, set }) => {
  const [rate, setRate] = useState(0);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      finalExam: {
        Xday: data.Xday,
        rate: Number(rate),
        score: data.score,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.finalExam);
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
      <Button
        variant="outlined"
        onClick={changeFlag}
        sx={{ color: "#1976d2", ml: 1 }}
      >
        割合変更
      </Button>

      <Modal open={flag} onClose={changeFlag}>
        <Box sx={style}>
          <label>
            期末割合
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
          <Button onClick={onAddEvent}>変更</Button>
        </Box>
      </Modal>
    </Box>
  );
};
