import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const IsFinishSmall = ({ rate, data, index, name, set }) => {
  const [isFinished, setIsFinished] = useState(data[index].isFinished);

  const onAddEvent = async () => {
    const newData = [...data];
    newData[index].isFinished = !isFinished;
    setIsFinished((prev) => !prev);
    const event = {
      smallExam: {
        rate: rate,
        smallExamArray: newData,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    set(event.smallExam.smallExamArray);
  };
  return (
    <Box>
      {isFinished ? (
        <Button
          variant="outlined"
          sx={{ color: "#269746", borderColor: "#269746", p: 0, mr: 1 }}
          onClick={onAddEvent}
        >
          実施済
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{ color: "#cd3131", borderColor: "#cd3131", p: 0, mr: 1 }}
          onClick={onAddEvent}
        >
          未実施
        </Button>
      )}
    </Box>
  );
};
