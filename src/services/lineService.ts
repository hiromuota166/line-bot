import https from 'https';
import { fetchGroups, fetchOrderStatus } from '../services/supabaseService';
import { courtTemplate } from '../templates/lineTemplates';

export const handleLineMessage = async (events: any) => {
  let replyMessage;

  if (events.message.type === "sticker") {
    try {
      replyMessage = [{
        type: "flex",
        altText: "コート情報",
        contents: courtTemplate(
          "コート1",
          ["西田英明", "山口想太"],  
          ["竹内悠", "池田光徽"],   
          ["乾勇翔", "渡邉泰成"],   
          ["朝川凌", "並木宙良"]    
        )
      }];      
      console.log('スタンプメッセージ:', JSON.stringify(replyMessage, null, 2));
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
      console.log('スタンプメッセージ:', JSON.stringify(replyMessage, null, 2));
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
        altText: "コート情報",
        contents: courtTemplate(
          "コート1",
          ["西田英明", "山口想太"],  
          ["竹内悠", "池田光徽"],   
          ["乾勇翔", "渡邉泰成"],   
          ["朝川凌", "並木宙良"]    
        )
      }];      
      console.log('スタンプメッセージ:', JSON.stringify(replyMessage, null, 2));
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
