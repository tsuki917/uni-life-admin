import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { db, auth } from "../../../libs/fire.js";
import { setDoc, doc } from "firebase/firestore";
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

export default function AddSubject({ close, setSubjectsData, subjectsData }) {
  const [subjectName, setSubjectname] = useState("");
  const [finalRate, setFinalRate] = useState(0);
  const [middleRate, setMiddleRate] = useState(0);
  const [smallRate, setsmallRate] = useState(0);
  const [reportRate, setReportRate] = useState(0);
  const [message, setMessage] = useState();
  const handleSubmit = (e) => {};

  const addSubjectData = async (
    subName,
    smallRate,
    middleRate,
    finalRate,
    reportRate
  ) => {
    const subDoc = doc(db, auth.currentUser.email, subName);
    const subjectData = {
      name: subName,
      finalExam: {
        rate: finalRate,
        score: 0,
        Xday: "未入力",
      },
      middleExam: {
        rate: middleRate,
        score: 0,
        Xday: "未入力",
      },
      smallExam: {
        rate: smallRate,
        smallExamArray: [],
      },
      reports: {
        rate: reportRate,
        reportArray: [],
      },
    };
    await setDoc(subDoc, subjectData);
    const subjectsData_copy = [];
    subjectsData.forEach((element) => {
      subjectsData_copy.push(element);
    });
    subjectsData_copy.push(subjectData);
    setSubjectsData(() => subjectsData_copy);
  };

  const onAddEvent = (e) => {
    if (subjectName) {
      console.log("add Event");
      if (!subjectsData.find((sub) => sub.name === subjectName)) {
        addSubjectData(
          subjectName,
          Number(smallRate),
          Number(middleRate),
          Number(finalRate),
          Number(reportRate)
        );
        close(false);
      } else {
        setMessage(
          <p style={{ color: "red" }}>既に存在する教科名は追加できません</p>
        );
      }
    } else {
      setMessage(<p style={{ color: "red" }}>教科名が未入力です</p>);
    }
    e.preventDefault();
  };
  return (
    <form onSubmit={(e) => onAddEvent(e)}>
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
        <label>
          教科名
          <input
            type="text"
            value={subjectName}
            onChange={(e) => {
              setSubjectname(e.target.value);
            }}
          />
        </label>
        <label>
          課題割合
          <input
            type="number"
            value={reportRate}
            min="0"
            max="100"
            onChange={(e) => {
              setReportRate(e.target.value);
            }}
          />
        </label>
        <label>
          小テスト割合
          <input
            type="number"
            value={smallRate}
            min="0"
            max="100"
            onChange={(e) => {
              setsmallRate(e.target.value);
            }}
          />
        </label>
        <label>
          中間試験割合
          <input
            type="number"
            value={middleRate}
            min="0"
            max="100"
            onChange={(e) => {
              setMiddleRate(e.target.value);
            }}
          />
        </label>
        <label>
          期末試験割合
          <input
            type="number"
            value={finalRate}
            min="0"
            max="100"
            onChange={(e) => {
              setFinalRate(e.target.value);
            }}
          />
        </label>
        <Button type="submit" value="確定">
          確定
        </Button>
      </Box>
    </form>
  );
}
