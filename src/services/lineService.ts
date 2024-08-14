import https from 'https';
import { fetchGroups, fetchOrderStatus } from '../services/supabaseService';
import { courtTemplate } from '../templates/lineTemplates';

export const handleLineMessage = async (events: any) => {  // 関数を async に変更
  let replyMessage;

  if (events.message.type === "sticker") {
    try {
      replyMessage = courtTemplate(
        "コート1",
        ["西田英明", "山口想太"],  // チームAの選手名
        ["竹内悠", "池田光徽"],   // チームBの選手名
        ["乾勇翔", "渡邉泰成"],   // 待機Aの選手名
        ["朝川凌", "並木宙良"]    // 待機Bの選手名
      );
    } catch (error) {
      console.error('スタンプ送るな')
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
      replyMessage = courtTemplate(
        "コート1",
        ["西田英明", "山口想太"],  // チームAの選手名
        ["竹内悠", "池田光徽"],   // チームBの選手名
        ["乾勇翔", "渡邉泰成"],   // 待機Aの選手名
        ["朝川凌", "並木宙良"]    // 待機Bの選手名
      );
    } catch (error) {
      console.error('スタンプ送るな')
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
