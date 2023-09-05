import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
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
export const ChaMidRate = ({ data, name, set }) => {
  const theme = useTheme();
  const [rate, setRate] = useState(0);
  const [flag, setFlag] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      middleExam: {
        Xday: data.Xday,
        rate: Number(rate),
        score: data.score,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.middleExam);
  };
  return (
    <div>
      {isSmallScreen ? (
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
            size="small"
            variant="outlined"
            onClick={changeFlag}
            sx={{ ml: 1 }}
          >
            割合変更
          </Button>
          <Modal open={flag} onClose={changeFlag}>
            <Box sx={phonestyle}>
              <TextField
                label="中間割合"
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
      ) : (
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
                label="中間割合"
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
      )}
    </div>
  );
};
