import { auth, db } from "../../../libs/fire";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";

export const ChangeSubject = ({ all, setAll, setSubject, change }) => {
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };

  const onDeleteEvent = async () => {
    const newData = { ...all };
    newData.name = name;
    await setDoc(doc(db, auth.currentUser.email, name), newData);
    await deleteDoc(doc(db, auth.currentUser.email, all.name));
    changeFlag();
    setAll(newData);
    setSubject(name);
    change();
  };
  return (
    <div>
      <button onClick={changeFlag}>教科名変更</button>
      {flag && (
        <div>
          <label>
            教科名
            <input
              //className=
              type="text"
              value={name}
              //name=
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <input
            //className=
            type="button"
            value="確定"
            onClick={onDeleteEvent}
          />
        </div>
      )}
    </div>
  );
};
