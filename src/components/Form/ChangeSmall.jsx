import { auth, db } from "../../libs/fire";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export const ChangeSmall = ({ rate, data, index, name, change }) => {
  const [day, setDay] = useState(data[index].Xday);
  const [title, setTitle] = useState(data[index].title);
  const [score, setScore] = useState(data[index].score);
  const onAddEvent = async () => {
    data[index] = {
      XDay: day,
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
    change();
  };
  return (
    <div>
      <label>
        小テスト名
        <input
          //className=
          type="text"
          value={title}
          //name="inputTitle"
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
          //name="inputTitle"
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
          //name="inputTitle"
          min="0"
          onChange={(e) => {
            setScore(e.target.value);
          }}
        />
      </label>
      <input
        //className=
        type="button"
        value="変更"
        onClick={onAddEvent}
      />
    </div>
  );
};
