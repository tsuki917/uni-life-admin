import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
export const AddSmall = ({ rate, data, name, set }) => {
  const [Xday, setXday] = useState();
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(null);
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState();
  const [take, setTake] = useState(false); // 初期設定
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  if (!take) {
    setTake(true);
    setXday();
    setTitle("");
    setScore(null);
  }
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
      setMessage("");
      setTake(false);
    } else {
      //エラー表示
      setMessage(<p style={{ color: "red" }}>未入力の項目があります</p>);
    }
  };
  return (
    <Box>
      <Button
        onClick={changeFlag}
        variant="outlined"
        sx={{ width: 1, textAlign: "center" }}
        startIcon={<AddIcon />}
      >
        小テスト追加
      </Button>
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
          {message}
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
    </Box>
  );
};
