import { auth, db } from "../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
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

export const ChangeFinal = ({ data, name, set }) => {
  const [Xday, setXday] = useState(data.Xday);
  const [rate, setRate] = useState(data.rate);
  const [score, setScore] = useState(data.score);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      finalExam: {
        Xday: Xday,
        rate: Number(rate),
        score: Number(score),
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.finalExam);
  };
  return (
    <div>
      <button onClick={changeFlag}>変更</button>

      <Modal open={flag} onClose={changeFlag}>
        <Box sx={style}>
          <label>
            実施日
            <input
              //className=
              type="text"
              value={Xday}
              //name=
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
