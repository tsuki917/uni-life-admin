import { auth, db } from "../../../libs/fire";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
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
export const ChangeSubject = ({ all, setAll, setSubject, change }) => {
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };

  const onDeleteEvent = async () => {
    const newData = { ...all };
    newData.name = name;
    await setDoc(doc(db, auth.currentUser.email, name), newData);
    await deleteDoc(doc(db, auth.currentUser.email, all.name));
    changeFlag();
    setAll(newData);
    setSubject(name);
    change();
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Button
          sx={{ mt: 3, mb: 3, ml: 1 }}
          onClick={changeFlag}
          variant="outlined"
        >
          教科名変更
        </Button>
      </Box>
      <Modal open={flag} onClose={changeFlag}>
        <Box sx={style}>
          <label>
            教科名
            <input
              //className=
              type="text"
              value={name}
              //name=
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <input
            //className=
            type="button"
            value="確定"
            onClick={onDeleteEvent}
          />
        </Box>
      </Modal>
    </Box>
  );
};
