import { auth, db } from "../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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
export const ChangeMiddle = ({ data, name, set }) => {
  const [Xday, setXday] = useState(data.Xday);
  const [rate, setRate] = useState(data.rate);
  const [score, setScore] = useState(data.score);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      middleExam: {
        Xday: Xday,
        rate: Number(rate),
        score: Number(score),
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.middleExam);
  };
  return (
    <div>
      {!flag && (
        <Button
          variant="outlined"
          sx={{ p: 0 }}
          onClick={changeFlag}
          startIcon={<EditIcon />}
        >
          編集
        </Button>
      )}
      <Modal open={flag} onClose={changeFlag}>
        <Box
          sx={{
            ...style,
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <label>
            実施日(yyyy/mm/dd)
            <input
              //className=
              type="text"
              value={Xday}
              name="inputTitle"
              onChange={(e) => {
                setXday(e.target.value);
              }}
            />
          </label>
          <label>
            割合
            <input
              //className=
              type="number"
              value={rate}
              //name=
              min="0"
              max="100"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </label>
          <label>
            点数
            <input
              //className=
              type="number"
              value={score}
              //name=
              min="0"
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
          </label>
          <input
            //className=
            type="button"
            value="確定"
            onClick={onAddEvent}
          />
        </Box>
      </Modal>
    </div>
  );
};