import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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
export const ChangeSmall = ({ rate, data, index, name, set }) => {
  const [Xday, setXday] = useState();
  const [title, setTitle] = useState(data[index].title);
  const [score, setScore] = useState(data[index].score);
  const [flag, setFlag] = useState(false);
  if (Xday === undefined) {
    // 前データの引継ぎ
    setXday(dayjs(data[index].Xday.seconds * 1000));
  }
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    if (Xday && title && score !== null) {
      const newData = [...data];
      newData[index] = {
        Xday: Xday.$d,
        title: title,
        score: Number(score),
      };
      const event = {
        smallExam: {
          rate: rate,
          smallExamArray: newData,
        },
      };
      await updateDoc(doc(db, auth.currentUser.email, name), event);
      changeFlag();
      set(event.smallExam.smallExamArray);
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
            <label>
              期限(yyyy/mm/dd)
              <DatePicker
                //className=
                value={Xday}
                inputFormat="yyyy/MM/dd"
                onChange={(newDay) => {
                  console.log(newDay);
                  setXday(newDay);
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
        </LocalizationProvider>
      </Modal>
    </div>
  );
};
