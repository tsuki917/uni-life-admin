import { auth, db } from "../../libs/fire";

import React, { useEffect, useState } from "react";
import { Box, List, Button } from "@mui/material";
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

export default function Subjects() {
  const [subjectsData, setSubjectsData] = useState([]);
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
          sx={{ bgcolor: "#1976d2", color: "white", textAlign: "center" }}
        >
          <p>追加</p>
          <AddIcon sx={{ pt: 1, pb: 1 }} />
        </Button>
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
