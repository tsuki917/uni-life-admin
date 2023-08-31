import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
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

export const ChangeFinal = ({ data, name, set }) => {
  const [Xday, setXday] = useState();
  const [score, setScore] = useState(data.score);
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState();
  if (Xday === undefined && data.Xday !== "未入力") {
    // 前データの引継ぎ
    //Dateのタイムスタンプはミリ秒単位, Firestoreのタイムスタンプは秒単位？
    setXday(dayjs(data.Xday.seconds * 1000));
  }
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    if (Xday && score !== null) {
      const event = {
        finalExam: {
          Xday: Xday.$d,
          rate: data.rate,
          score: Number(score),
        },
      };
      await updateDoc(doc(db, auth.currentUser.email, name), event);
      changeFlag();
      console.log(event.finalExam);
      console.log("seconds" in event.finalExam.Xday);
      set(event.finalExam);
      setMessage("");
    } else {
      //エラー表示
      setMessage(<p style={{ color: "red" }}>未入力の項目があります</p>);
    }
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              ...style,
              flex: 1,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {message}
            <label>
              実施日(yyyy/mm/dd)
              <DatePicker
                //className=
                value={Xday}
                inputFormat="yyyy/MM/dd"
                onChange={(newDay) => {
                  setXday(newDay);
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
        </LocalizationProvider>
      </Modal>
    </div>
  );
};
