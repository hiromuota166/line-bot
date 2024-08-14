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
        "header": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "コート１",
              "size": "xl",
              "weight": "bold"
            }
          ]
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "TEAM",
                  "flex": 1,
                  "color": "#111111",
                  "weight": "bold",
                  "align": "start",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "Player1",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "bold",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "Player2",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "bold",
                  "align": "start"
                }
              ]
            },
            {
              "type": "separator"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "A",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "西田英明",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "山口想太",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "B",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "竹内悠",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "池田光徽",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                }
              ]
            },
            {
              "type": "separator"
            },
            {
              "type": "text",
              "text": "コート待機選手",
              "size": "md",
              "color": "#111111",
              "weight": "regular"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "A",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "乾勇翔",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "渡邉泰成",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "B",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "朝川凌",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "並木宙良",
                  "flex": 1,
                  "size": "sm",
                  "color": "#111111",
                  "weight": "regular",
                  "align": "start"
                }
              ]
            }
          ],
          "margin": "md",
          "spacing": "lg"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "待機選手一覧",
                "text": "待機選手一覧"
              },
              "height": "md",
              "color": "#111111",
              "margin": "md"
            }
          ],
          "backgroundColor": "#ffffff"
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
    
      replyMessage = [{
        type: "text",
        text: `進行中の対戦はこちら:\n${matches.join("\n")}`,  // 各対戦を改行で区切って表示
      }];
    
    } catch (error) {
      replyMessage = [{
        type: "text",
        text: "進行中の対戦情報の取得に失敗しました。",
      }];
    }    
  } else if (events.message.text === "待機選手と待ちコート") {
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
    
      replyMessage = [{
        type: "text",
        text: `進行中の対戦はこちら:\n${matches.join("\n")}`,  // 各対戦を改行で区切って表示
      }];
    
    } catch (error) {
      replyMessage = [{
        type: "text",
        text: "進行中の対戦情報の取得に失敗しました。",
      }];
    }
  }

  // replyMessage が設定されていることを確認
  if (!replyMessage) {
    replyMessage = [{
      type: "text",
      text: "無効なメッセージです。",
    }];
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
