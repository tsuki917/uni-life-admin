import React from "react";
import "../libs/fire.js";
import { Link } from "react-router-dom";
import image1 from "../asset/image1.png";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  ImageListTile,
  ListSubheader,
} from "@mui/material";

export default function Home() {
  const imageUrl2 =
    "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6099119905dc8225f36ebb25_69.png";
  const imageUrl1 =
    "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6117b8653c763681ae880e85_87.png";
  const imageUrl3 =
    "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/610e354b42d21a7b18a9270a_41.png";
  const imageUrl4 =
    "https://cdn.pixabay.com/photo/2016/09/05/10/50/app-1646211_1280.png";

  return (
    <div style={{ margin: "0 auto", maxWidth: "800px" }}>
      <h1>学生のための成績管理サイト！</h1>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>
            レポートの期限が気づかないうちに過ぎてしまい、評価が下がってしまったことや、テストの日程管理がうまくできておらず単位を落としてしまった経験はありませんか？
          </p>
          <a href={imageUrl1} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl1} alt="画像1の説明" width="250" height="250" />
          </a>
        </div>
        <p style={{ textAlign: "center" }}>
          ここでは課題と小テスト、中間テストと期末テストの成績を常に管理して、
          <br />
          単位取得まであと何点かを把握することができます！
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a href={imageUrl4} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl4} alt="画像4の説明" width="80" height="80" />
          </a>
        </div>

        <div className="App">
          <img
            src={image1}
            alt="logo"
            width="800"
            style={{
              border: "4px solid #1976d2", // 枠の太さと色を設定
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a href={imageUrl2} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl2} alt="画像2の説明" width="280" height="280" />
          </a>
          <p>
            課題やテストを自己評価し、点数をつけることで単位取得までの点数を自動で計算してくれます！
          </p>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>
            Googleのアカウントを持っていれば登録なしで使うことができるので
            <br />
            早速右上のログインボタンから使ってみましょう!!!!
          </p>
          <a href={imageUrl3} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl3} alt="画像3の説明" width="250" height="250" />
          </a>
        </div>
      </div>
    </div>
  );
}
