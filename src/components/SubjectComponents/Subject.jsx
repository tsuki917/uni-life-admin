import { ListItem, Typography, ListItemText, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
export default function Subject({ data }) {
  const [subjectEvo, setSubjectEvo] = useState(0);
  console.log(data.name);
  useEffect(() => {
    let score = 0;
    let maxScore = 0;
    const middleExamPoint = data.middleExam
      ? data.middleExam.score * data.middleExam.rate * 0.01
      : 0;
    const middleMaxScore = data.middleExam.score ? data.middleExam.rate : 0;
    const finalExamPoint = data.finalExam
      ? data.finalExam.score * data.finalExam.rate * 0.01
      : 0;
    const finalMaxScore = data.finalExam.score ? data.finalExam.rate : 0;
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
    maxScore += middleMaxScore + finalMaxScore + reportMaxScore + smallMaxScore;
    score += middleExamPoint;
    score += finalExamPoint;
    score += smallExamPoint;
    score += reportPoint;

    console.log(maxScore + "maxScore");
    console.log(score);
    setSubjectEvo(score);
  }, [data]);

  return (
    <Link component={LinkRouter} to={"/subjects/" + data.name} underline="none">
      <ListItem sx={{ bgcolor: "#eeeef0", mb: 1 }}>
        <ListItemText
          primary={data.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {data.name}
              </Typography>
              {/* content */}
              {" — " + data.finalExam.score + "   現在の推定得点:" + subjectEvo}
            </React.Fragment>
          }
        />
      </ListItem>
    </Link>
  );
}
