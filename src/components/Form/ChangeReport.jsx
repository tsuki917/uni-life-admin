import { auth, db } from "../../libs/fire";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export const ChangeReport = ({ rate, data, index, name, set }) => {
  const [day, setDay] = useState(data[index].deadlineDay);
  const [title, setTitle] = useState(data[index].title);
  const [score, setScore] = useState(data[index].score);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    data[index] = {
      deadlineDay: day,
      title: title,
      score: Number(score),
    };
    const event = {
      reports: {
        rate: rate,
        reportArray: data,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set([...event.reports.reportArray]);
  };
  return (
    <div>
      <button onClick={changeFlag}>変更</button>
      {flag && (
        <div>
          <label>
            課題名
            <input
              //className=
              type="text"
              value={title}
              //name=
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label>
            期限
            <input
              //className=
              type="text"
              value={day}
              //name=
              onChange={(e) => {
                setDay(e.target.value);
              }}
            />
          </label>
          <label>
            成績
            <input
              //className=
              type="number"
              value={score}
              //name=
              min="0"
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
          </label>
          <input
            //className=
            type="button"
            value="確定"
            onClick={onAddEvent}
          />
        </div>
      )}
    </div>
  );
};
