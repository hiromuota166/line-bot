import express from 'express';
import https from 'https';
import dotenv from 'dotenv';
import path from 'path';

// .envファイルの読み込み
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.LINE_ACCESS_TOKEN;

// Expressを通して画像ファイルをユーザーに提供できるようにする
app.use('/images', express.static(path.join(__dirname, 'images')));

// jsonを受け取れるようにする
app.use(express.json());
// urlエンコードを受け取れるようにする
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/webhook", function (req, res) {
  res.send("HTTP POST request sent to the webhook URL!");
  // ユーザーがボットにメッセージを送った場合、応答メッセージを送る
  const events = req.body.events[0];
  if (events.type === "message" && events.message.type === "text") {
    // APIサーバーに送信する応答トークンとメッセージデータを文字列化する
    // JSON.stringifyは、JavaScriptのオブジェクトをJSON文字列に変換するメソッド
    const userMessage = events.message.text;

    let replyMessage

    if (events.messeage.type === "sticker") {
      replyMessage = [{
        type: "sticker",
        packageId: "1",
        stickerId: "1",
      }];
    } else if (events.message.type === "text") {
      replyMessage = [{
        type: "text",
        text: userMessage,
      }];
    }

    const dataString = JSON.stringify({
      // 応答トークンを定義
      replyToken: events.replyToken,
      // 返信するメッセージを定義
      messages: replyMessage,
    });

    // リクエストヘッダー。仕様についてはMessaging APIリファレンスを参照してください。
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    // Node.jsドキュメントのhttps.requestメソッドで定義されている仕様に従ったオプションを指定します。
    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: headers,
      body: dataString,
    };

    // messageタイプのHTTP POSTリクエストが/webhookエンドポイントに送信された場合、
    // 変数webhookOptionsで定義したhttps://api.line.me/v2/bot/message/replyに対して
    // HTTP POSTリクエストを送信します。

    // リクエストの定義
    const request = https.request(webhookOptions, (res) => { //()の中はコールバック関数。サーバーからの応答を受け取ったときに呼び出される
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    // エラーをハンドリング
    // request.onは、APIサーバーへのリクエスト送信時に
    // エラーが発生した場合にコールバックされる関数です。
    request.on("error", (err) => {
      console.error(err);
    });

    // 最後に、定義したリクエストを送信
    request.write(dataString);
    request.end();
  }
});

// listenは、指定されたポートでアプリケーションを起動します。
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});