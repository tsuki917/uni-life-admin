import { auth, db } from "../../libs/fire";

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
import AddSubject from "../Form/AddSubject";
const style = {
  position: "absolute",
  top: "50%",
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const data = getSubjectDatas();
    data.then((element) => {
      console.log(element);
      setSubjectsData(element);
    });
  }, []);
  /*
    type subjectData = {
        
    }
    
    */

  return (
    <div>
      <h2>教科一覧</h2>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{ bgcolor: "#1976d2", color: "white", p: 0, mr: 2 }}
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

      <List sx={{ ml: 4 }}>
        {subjectsData.map((subjectData, key) => {
          return (
            <div key={key}>
              <Subject data={subjectData} />
            </div>
          );
        })}
      </List>
    </div>
  );
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
