import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";

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
export const AddReport = ({ rate, data, name, set }) => {
  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(null);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      deadlineDay: day,
      title: title,
      score: Number(score),
    };
    const all = {
      reports: {
        rate: rate,
        reportArray: [...data, event],
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), all);
    changeFlag();
    set([...all.reports.reportArray]);
  };
  return (
    <div>
      <Button onClick={changeFlag}>課題追加</Button>
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
            課題名
            <input
              //className=
              type="text"
              value={title}
              //name=
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label>
            期限
            <input
              //className=
              type="text"
              value={day}
              //name=
              onChange={(e) => {
                setDay(e.target.value);
              }}
            />
          </label>
          <label>
            成績
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
