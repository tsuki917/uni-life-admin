import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
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
export const DeleteReport = ({ rate, data, index, name, set }) => {
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const newData = [...data];
    newData.splice(index, 1);
    const event = {
      reports: {
        rate: rate,
        reportArray: newData,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.reports.reportArray);
  };
  return (
    <Box>
      <Button
        sx={{ p: 0, m: 0, ml: 1, borderColor: "red", color: "red" }}
        onClick={changeFlag}
        variant="outlined"
        startIcon={<Delete />}
      >
        削除
      </Button>
      <Modal open={flag} onClose={changeFlag}>
        <Box sx={style}>
          <h2>本当に消しますか？</h2>
          <Button onClick={onAddEvent}>はい</Button>
          <Button onClick={changeFlag}>いいえ</Button>
        </Box>
      </Modal>
    </Box>
  );
};
