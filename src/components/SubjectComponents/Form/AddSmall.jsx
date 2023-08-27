import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

export const AddSmall = ({ rate, data, name, set }) => {
  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(null);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      Xday: day,
      title: title,
      score: Number(score),
    };
    const all = {
      smallExam: {
        rate: rate,
        smallExamArray: [...data, event],
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), all);
    changeFlag();
    set([...all.smallExam.smallExamArray]);
  };
  return (
    <div>
      <button onClick={changeFlag}>新規追加</button>
      {flag && (
        <div>
          <label>
            小テスト名
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
