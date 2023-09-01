import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
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
export const ChangeReport = ({ rate, data, index, name, set }) => {
  const [Xday, setXday] = useState();
  const [title, setTitle] = useState(data[index].title);
  const [score, setScore] = useState(data[index].score);
  const [flag, setFlag] = useState(false);
  const [take, setTake] = useState(false); // 初期設定
  const [message, setMessage] = useState();
  if (Xday === undefined) {
    // 前データの引継ぎ
    setXday(dayjs(data[index].deadlineDay.seconds * 1000));
  }
  if (!take) {
    setTake(true);
    setTitle(data[index].title);
    setScore(data[index].score);

    if ("seconds" in data[index].deadlineDay) {
      setXday(dayjs(data[index].deadlineDay.seconds * 1000));
    } else {
      setXday(dayjs(data[index].deadlineDay));
    }
  }

  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    if (title) {
      const newData = [...data];
      newData[index] = {
        deadlineDay: Xday.$d,
        title: title,
        score: Number(score),
        isFinished: data[index].isFinished,
      };
      newData.sort((a, b) => {
        let na, nb;
        if ("seconds" in a.deadlineDay) {
          na = a.deadlineDay.toDate();
        } else {
          na = new Date(a.deadlineDay);
        }
        if ("seconds" in b.deadlineDay) {
          nb = b.deadlineDay.toDate();
        } else {
          nb = new Date(b.deadlineDay);
        }
        return na - nb;
      });
      const event = {
        reports: {
          rate: rate,
          reportArray: newData,
        },
      };
      await updateDoc(doc(db, auth.currentUser.email, name), event);
      changeFlag();
      set(event.reports.reportArray);
      setMessage("");
      setTake(false);
    } else {
      setMessage(<p style={{ color: "red" }}>課題名が未入力です</p>);
    }
  };
  return (
    <div>
      {!flag && (
        <Button
          variant="outlined"
          onClick={changeFlag}
          sx={{ p: 0 }}
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
            <TextField
              required
              label="課題名"
              variant="outlined"
              maxlength="100"
              value={title}
              margin="normal"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <DatePicker
              label="期限"
              value={Xday}
              inputFormat="yyyy/MM/dd"
              margin="normal"
              onChange={(newDay) => {
                setXday(newDay);
              }}
            />
            <TextField
              label="成績(0~100)"
              variant="outlined"
              type="number"
              value={score}
              min="0"
              max="100"
              margin="normal"
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
            <Button variant="outlined" onClick={onAddEvent}>
              変更
            </Button>
          </Box>
        </LocalizationProvider>
      </Modal>
    </div>
  );
};
