import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
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
};
export const ChangeMiddle = ({ data, name, set }) => {
  const theme = useTheme();
  const [Xday, setXday] = useState();
  const [score, setScore] = useState(data.score);
  const [title, setTitle] = useState(data.title);
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (Xday === undefined && data.Xday !== "未入力") {
    // 前データの引継ぎ
    setXday(dayjs(data.Xday.seconds * 1000));
  }
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    if (Xday) {
      const event = {
        middleExam: {
          Xday: Xday.$d,
          rate: data.rate,
          score: Number(score),
          title: title,
          isFinished: data.isFinished,
        },
      };
      await updateDoc(doc(db, auth.currentUser.email, name), event);
      changeFlag();
      set(event.middleExam);
      setMessage("");
    } else {
      //エラー表示
      setMessage(<p style={{ color: "red" }}>日付が未入力です</p>);
    }
  };
  return (
    <div>
      {isSmallScreen ? (
        <div>
          {!flag && (
            <Button
              variant="outlined"
              sx={{ p: 0, height: 30, marginLeft: "8px" }}
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
                  ...phonestyle,
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {message}

                <DatePicker
                  //className=
                  label="実施日"
                  value={Xday}
                  inputFormat="yyyy/MM/dd"
                  margin="normal"
                  onChange={(newDay) => {
                    setXday(newDay);
                  }}
                />

                <TextField
                  label="点数(0~100)"
                  variant="outlined"
                  type="number"
                  value={score}
                  min="0"
                  max="100"
                  margin="normal"
                  sx={{ marginBottom: 0 }}
                  onChange={(e) => {
                    setScore(e.target.value);
                  }}
                />

                <TextField
                  label="メモ（任意）"
                  variant="outlined"
                  maxLength="100"
                  value={title}
                  margin="normal"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  onClick={onAddEvent}
                >
                  変更
                </Button>
              </Box>
            </LocalizationProvider>
          </Modal>
        </div>
      ) : (
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

                <DatePicker
                  //className=
                  label="実施日"
                  value={Xday}
                  inputFormat="yyyy/MM/dd"
                  margin="normal"
                  onChange={(newDay) => {
                    setXday(newDay);
                  }}
                />

                <TextField
                  label="点数(0~100)"
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

                <TextField
                  label="メモ（任意）"
                  variant="outlined"
                  maxLength="100"
                  value={title}
                  margin="normal"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <Button variant="outlined" onClick={onAddEvent}>
                  変更
                </Button>
              </Box>
            </LocalizationProvider>
          </Modal>
        </div>
      )}
    </div>
  );
};
