import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
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
export const AddSmall = ({ rate, data, name, set }) => {
  const [Xday, setXday] = useState();
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(null);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    if (Xday && title && score !== null) {
      const event = {
        Xday: Xday.$d,
        title: title,
        score: Number(score),
      };
      const all = {
        smallExam: {
          rate: rate,
          smallExamArray: [...data, event],
        },
      };
      await updateDoc(doc(db, auth.currentUser.email, name), all);
      changeFlag();
      set([...data, event]);
    } else {
      //エラー表示
    }
  };
  return (
    <div>
      <Button onClick={changeFlag}>小テスト追加</Button>
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
            小テスト名
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label>
              期限
              <DatePicker
                //className=
                inputFormat="yyyy/MM/dd"
                onChange={(newDay) => {
                  console.log(newDay);
                  setXday(newDay);
                }}
              />
            </label>
          </LocalizationProvider>
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
