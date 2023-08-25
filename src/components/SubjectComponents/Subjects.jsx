import { auth, db } from "../../libs/fire";

import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
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
  useEffect(() => {
    const data = getSubjectDatas();
    data.then((element) => {
      console.log(element);
      setSubjextsData(element);
    });
  }, []);
  /*
    type subjectData = {
        
    }
    
    */
  const [subjectsData, setSubjextsData] = useState([]);

  return (
    <div>
      <h1>subject</h1>

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
