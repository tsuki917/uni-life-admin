import { auth, db } from "../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
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
export const ChangeSmall = ({ rate, data, index, name, set }) => {
  const [day, setDay] = useState(data[index].Xday);
  const [title, setTitle] = useState(data[index].title);
  const [score, setScore] = useState(data[index].score);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    data[index] = {
      Xday: day,
      title: title,
      score: Number(score),
    };
    const event = {
      smallExam: {
        rate: rate,
        smallExamArray: data,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set([...event.smallExam.smallExamArray]);
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