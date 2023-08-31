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

  const handleSubmit = (e) => {
    e.preventDefault();
    close(false);
  };

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

  const onAddEvent = () => {
    console.log("add Event");
    if (!subjectsData.find((sub) => sub.name === subjectName)) {
      addSubjectData(
        subjectName,
        Number(smallRate),
        Number(middleRate),
        Number(finalRate),
        Number(reportRate)
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
          教科名
          <input
            //className=
            type="text"
            value={subjectName}
            //name=
            onChange={(e) => {
              setSubjectname(e.target.value);
            }}
          />
        </label>
        <label>
          課題割合
          <input
            //className=
            type="number"
            value={reportRate}
            //name=
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
            //className=
            type="number"
            value={smallRate}
            //name=
            min="0"
            onChange={(e) => {
              setsmallRate(e.target.value);
            }}
          />
        </label>
        <label>
          中間試験割合
          <input
            //className=
            type="number"
            value={middleRate}
            //name=
            min="0"
            onChange={(e) => {
              setMiddleRate(e.target.value);
            }}
          />
        </label>
        <label>
          期末試験割合
          <input
            //className=
            type="number"
            value={finalRate}
            //name=
            min="0"
            onChange={(e) => {
              setFinalRate(e.target.value);
            }}
          />
        </label>
        <Button
          //className=
          type="submit"
          value="確定"
          onClick={onAddEvent}
        >
          確定
        </Button>
      </Box>
    </form>
  );
}
