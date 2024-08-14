import https from 'https';
import { fetchGroups, fetchOrderStatus } from '../services/supabaseService';
import { courtCarouselTemplate } from '../templates/lineTemplates';

export const handleLineMessage = async (events: any) => {
  let replyMessage;

  const courtsData = [
    {
      courtName: "コート1",
      teamA: ["西田英明", "山口想太"],
      teamB: ["竹内悠", "池田光徽"],
      waitingA: ["乾勇翔", "渡邉泰成"],
      waitingB: ["朝川凌", "並木宙良"]
    },
    {
      courtName: "コート2",
      teamA: ["浅田匠一郎", "安達隆太郎"],
      teamB: ["伊藤新太", "岩瀬拓馬"],
      waitingA: ["田中暖人", "林洸希"],
      waitingB: ["広田侑平", "帆苅翔平"]
    },
  ];

  const carouselMessage = courtCarouselTemplate(courtsData);

  if (events.message.type === "sticker") {
    try {
      replyMessage = [{
        type: "flex",
        altText: "コート情報一覧",
        contents: carouselMessage
      }];
    } catch (error) {
      replyMessage = [{
        type: "text",
        text: "進行中の対戦情報の取得に失敗しました。",
      }];
    }
  } else if (events.message.text === "進行中の試合") {
    try {
      const orders = await fetchOrderStatus();  
    
      const matches = orders.map((order: any) => {
        if (order.is_doubles) {
          const group1FirstName = order.group1_first?.name || "不明な選手";
          const group1SecondName = order.group1_second?.name || "不明な選手";
          const group2FirstName = order.group2_first?.name || "不明な選手";
          const group2SecondName = order.group2_second?.name || "不明な選手";
    
          return `${group1FirstName} & ${group1SecondName} vs ${group2FirstName} & ${group2SecondName}`;
        } else {
          const group1Name = order.group1_first?.name || "不明な選手";
          const group2Name = order.group2_first?.name || "不明な選手";
    
          return `${group1Name} vs ${group2Name}`;
        }
      });
    
      replyMessage = [{
        type: "text",
        text: `進行中の対戦はこちら:\n${matches.join("\n")}`,
      }];
    } catch (error) {
      replyMessage = [{
        type: "text",
        text: "進行中の対戦情報の取得に失敗しました。",
      }];
    }    
  } else if (events.message.text === "待機選手と待ちコート") {
    try {
      replyMessage = [{
        type: "flex",
        altText: "コート情報一覧",
        contents: carouselMessage
      }];
    } catch (error) {
      replyMessage = [{
        type: "text",
        text: "進行中の対戦情報の取得に失敗しました。",
      }];
    }
  }

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
