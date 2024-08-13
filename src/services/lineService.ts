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
    
      // 対戦のリストを構築
      const matches = orders.map((order: any) => {
        if (order.is_doubles) {
          // ダブルスの場合
          const group1FirstName = order.group1_first?.name || "不明な選手";
          const group1SecondName = order.group1_second?.name || "不明な選手";
          const group2FirstName = order.group2_first?.name || "不明な選手";
          const group2SecondName = order.group2_second?.name || "不明な選手";
    
          return `${group1FirstName} & ${group1SecondName} vs ${group2FirstName} & ${group2SecondName}`;
        } else {
          // シングルスの場合
          const group1Name = order.group1_first?.name || "不明な選手";
          const group2Name = order.group2_first?.name || "不明な選手";
    
          return `${group1Name} vs ${group2Name}`;
        }
      });
    
      // メッセージの内容を作成
      const replyMessage = [{
        type: "text",
        text: `進行中の対戦はこちら:\n${matches.join("\n")}`,  // 各対戦を改行で区切って表示
      }];
    
    } catch (error) {
      const replyMessage = [{
        type: "text",
        text: "進行中の対戦情報の取得に失敗しました。",
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
