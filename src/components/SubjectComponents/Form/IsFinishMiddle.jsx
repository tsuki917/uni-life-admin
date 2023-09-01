import React from "react";
import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { Box, Button } from "@mui/material";
import { db, auth } from "../../../libs/fire";

export default function IsFinishMiddle({ data, name, set }) {
  const [isFinished, setIsFinished] = useState(data.isFinished);

  const onAddEvent = async () => {
    setIsFinished((prev) => !prev);
    const event = {
      middleExam: {
        score: data.score,
        Xday: data.Xday,
        isFinished: !data.isFinished,
        rate: data.rate,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    set(event.middleExam);
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
}
