import {
  ListItem,
  Typography,
  ListItemText,
  Link,
  Box,
  Button,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useRef, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { db, auth } from "../../libs/fire";
import { deleteDoc, doc } from "firebase/firestore";
import { Opacity } from "@mui/icons-material";
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
export default function Subject({ data, setSubjectsData, subjectsData }) {
  const [subjectEvo, setSubjectEvo] = useState(0);
  const [subjectEvoRate, setSubjectEvoRate] = useState(0);
  const [modalFlag, setModalFlag] = useState(false);
  const [EvoAL, setEvoAL] = useState("計算中");
  const [EvoColor, setEvoColor] = useState({ color: "black" });
  const [maxRateName, setMaxRateName] = useState("");
  console.log(data.name);
  useEffect(() => {
    let score = 0;
    let maxScore = 0;
    let maxRate = 0;
    if (maxRate < data.middleExam.rate) {
      maxRate = data.middleExam.rate;
      console.log("中間試験");
      setMaxRateName("中間試験");
    }
    if (maxRate < data.finalExam.rate) {
      maxRate = data.finalExam.rate;
      console.log("期末試験");
      setMaxRateName("期末試験");
    }
    if (maxRate < data.reports.rate) {
      maxRate = data.reports.rate;
      console.log("レポート課題");
      setMaxRateName("レポート課題");
    }
    if (maxRate < data.smallExam.rate) {
      maxRate = data.reports.rate;
      console.log("小テスト");
      setMaxRateName("小テスト");
    }

    const middleExamPoint = data.middleExam
      ? data.middleExam.score * data.middleExam.rate * 0.01
      : 0;
    const middleMaxScore =
      data.middleExam.score !== 0 ? data.middleExam.rate : 0;
    const finalExamPoint = data.finalExam
      ? data.finalExam.score * data.finalExam.rate * 0.01
      : 0;
    const finalMaxScore = data.finalExam.score !== 0 ? data.finalExam.rate : 0;
    let smallExamPoint = 0;
    if (data.smallExam.smallExamArray.length !== 0) {
      data.smallExam.smallExamArray.forEach((ele) => {
        smallExamPoint += ele.score / data.smallExam.smallExamArray.length;
      });
    }
    smallExamPoint *= data.smallExam.rate * 0.01;

    const smallMaxScore =
      data.smallExam.smallExamArray.length > 0 ? data.smallExam.rate : 0;

    let reportPoint = 0;

    data.reports.reportArray.forEach((ele) => {
      reportPoint += ele.score / data.reports.reportArray.length;
    });
    reportPoint *= data.reports.rate * 0.01;
    const reportMaxScore =
      data.reports.reportArray.length > 0 ? data.reports.rate : 0;
    maxScore += parseFloat(middleMaxScore);
    maxScore += parseFloat(finalMaxScore);
    maxScore += parseFloat(reportMaxScore);
    maxScore += parseFloat(smallMaxScore);
    score += middleExamPoint;
    score += finalExamPoint;
    score += smallExamPoint;
    score += reportPoint;
    const scoreRate =
      maxScore !== 0 ? Math.round((score / maxScore) * 100 * 10) / 10 : 0;
    console.log(maxScore + "maxScore");
    console.log(score);
    setSubjectEvoRate(scoreRate);
    setSubjectEvo(score);
  }, [data]);

  useEffect(() => {
    if (subjectEvoRate >= 90) {
      setEvoAL("A");
      setEvoColor({ color: "#CC0000" });
    } else if (subjectEvoRate >= 80) {
      setEvoAL("B");
      setEvoColor({ color: "#FF9872" });
    } else if (subjectEvoRate >= 70) {
      setEvoAL("C");
      setEvoColor({ color: "#B8860B" });
    } else if (subjectEvoRate >= 60) {
      setEvoAL("D");
      setEvoColor({ color: "#005FFF" });
    } else if (subjectEvoRate < 60) {
      setEvoAL("E");
      setEvoColor({ color: "#555555" });
    } else {
      setEvoAL("推定不可");
    }
  }, [subjectEvoRate]);

  const deleteSubject = async (e) => {
    const subjectDoc = doc(db, auth.currentUser.email, data.name);
    await deleteDoc(subjectDoc);
    const subjectArray_copy = [];
    subjectsData.forEach((ele) => {
      if (ele.name !== data.name) {
        subjectArray_copy.push(ele);
      }
      setSubjectsData(subjectArray_copy);
    });
    setModalFlag(false);
  };

  const handleChangeFlag = () => {
    console.log("flag");
    setModalFlag((prev) => !prev);
  };

  return (
    <ListItem sx={{ bgcolor: "#eeeef0", mb: 1, width: 1 }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-around",
          width: 1,
        }}
      >
        <Link
          component={LinkRouter}
          to={"/subjects/" + data.name}
          underline="none"
          sx={{ width: "90%" }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              p: 0,
              m: 0,
            }}
          >
            <Box sx={{ width: "60%" }}>
              <ListItemText primary={data.name} />
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                p: 0,
                m: 0,
              }}
            >
              <span>持ち点:{subjectEvo}点</span>
              <span>得点率:{subjectEvoRate}%</span>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                p: 0,
                m: 0,
              }}
            >
              <span>最重要項目:{maxRateName}</span>

              <span>
                推定評価:<span style={EvoColor}>{EvoAL}</span>
              </span>
            </Box>
          </Box>
        </Link>
      </Box>
      <Button
        sx={{ p: 0 }}
        onClick={handleChangeFlag}
        startIcon={<DeleteIcon />}
      >
        削除
      </Button>
      <Modal open={modalFlag} onClose={handleChangeFlag}>
        <Box sx={style}>
          <h1>本当に削除しますか？</h1>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              p: 0,
              m: 0,
            }}
          >
            <Button onClick={deleteSubject}>はい</Button>
            <Button onClick={handleChangeFlag}>いいえ</Button>
          </Box>
        </Box>
      </Modal>
    </ListItem>
  );
}
