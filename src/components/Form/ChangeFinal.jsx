import { auth, db } from "../../libs/fire";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export const ChangeFinal = ({ data, name, set }) => {
  const [Xday, setXday] = useState(data.Xday);
  const [rate, setRate] = useState(data.rate);
  const [score, setScore] = useState(data.score);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      finalExam: {
        Xday: Xday,
        rate: Number(rate),
        score: Number(score),
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.finalExam);
  };
  return (
    <div>
      <button onClick={changeFlag}>変更</button>
      {flag && (
        <div>
          <label>
            実施日
            <input
              //className=
              type="text"
              value={Xday}
              //name=
              onChange={(e) => {
                setXday(e.target.value);
              }}
            />
          </label>
          <label>
            割合
            <input
              //className=
              type="number"
              value={rate}
              //name=
              min="0"
              max="100"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </label>
          <label>
            点数
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
