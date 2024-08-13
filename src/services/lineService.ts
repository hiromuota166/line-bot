import https from 'https';
import { fetchGroups, fetchOrderStatus } from '../services/supabaseService';  // Supabaseからのデータ取得関数をインポート

export const handleLineMessage = async (events: any) => {  // 関数を async に変更
  let replyMessage;

  if (events.message.type === "sticker") {
    replyMessage = {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "hello"
            },
            {
              "type": "text",
              "text": "world"
            }
          ]
        }
      }
    }
  } else if (events.message.text === "進行中の試合") {
    try {
      const orders = await fetchOrderStatus();  // Supabaseからデータを取得
      const orderStatus = orders.map((order: any) => order.order_status).join(", ");  // グループ名を取得して結合

      replyMessage = [{
        type: "text",
        text: `進行状況一覧: ${orderStatus}`,  // グループ名をテキストとして返信
      }];
    } catch (error) {
      replyMessage = [{
        type: "text",
        text: "グループデータの取得に失敗しました。",
      }];
    }
  }

  const dataString = JSON.stringify({
    replyToken: events.replyToken,
    messages: replyMessage,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
  };

  const webhookOptions = {
    hostname: "api.line.me",
    path: "/v2/bot/message/reply",
    method: "POST",
    headers: headers,
  };

  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  request.on("error", (err) => {
    console.error(err);
  });

  request.write(dataString);
  request.end();
};
