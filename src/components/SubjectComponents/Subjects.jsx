import { db, auth } from "../../libs/fire.js";

import React, { useEffect, useState } from "react";
import { Box, List, Button, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Subject from "./Subject.jsx";
import AddSubject from "../SubjectComponents/Form/AddSubject.jsx";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Subjects() {
  const [subjectsData, setSubjectsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(auth.currentUser);
  // if (auth.currentUser !== null && first) {
  useEffect(() => {
    //ログイン時初回
    setFirst(false);
    const data = getSubjectDatas();
    data.then((element) => {
      console.log(element);
      setSubjectsData(element);
    });
  }, []);
  // } else if (auth.currentUser !== null && !first) {
  return (
    <div>
      <Box sx={{ ml: 6 }}>
        <h2>教科一覧</h2>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            p: 0,
            mr: 6,
            "&:hover": {
              backgroundColor: "#6d90b2",
            },
          }}
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          追加
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddSubject
              close={setOpen}
              setSubjectsData={setSubjectsData}
              subjectsData={subjectsData}
            />
          </Box>
        </Modal>
      </Box>

      <List sx={{ ml: 6, mr: 6 }}>
        {subjectsData.map((subjectData, key) => {
          return (
            <Box key={key}>
              <Subject
                data={subjectData}
                setSubjectsData={setSubjectsData}
                subjectsData={subjectsData}
              />
            </Box>
          );
        })}
      </List>
    </div>
  );
  // } else {
  //   //ログイン前画面
  //   return <h3>ログインしてください</h3>;
  // }
  /*
    type subjectData = {
        
    }
    
    */
}

async function getSubjectDatas() {
  const subjectsNewData = [];
  const test = collection(db, auth.currentUser.email);
  const q = await getDocs(test);
  q.forEach((ele) => {
    subjectsNewData.push(ele.data());
  });
  return subjectsNewData;
}
