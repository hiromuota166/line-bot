import https from 'https';
import { fetchCourtsWithPlayers, fetchGroups, fetchOrderStatus } from '../services/supabaseService';
import { courtCarouselTemplate } from '../templates/lineTemplates';

export const handleLineMessage = async (events: any) => {
  let replyMessage;

  // 動的にcourtsDataを生成
  const fetchAndProcessCourtData = async () => {
    const courts = await fetchCourtsWithPlayers(); // fetchCourtsWithPlayersは事前に型付きで作成済み

    return courts.map(court => ({
      courtName: `コート${court.court_number}`,
      teamA: [
        court.now_order_id?.group1_first?.name || "不明な選手",
        court.now_order_id?.group1_second?.name || "不明な選手"
      ],
      teamB: [
        court.now_order_id?.group2_first?.name || "不明な選手",
        court.now_order_id?.group2_second?.name || "不明な選手"
      ],
      waitingA: [
        court.waiting_id?.group1_first?.name || "不明な選手",
        court.waiting_id?.group1_second?.name || "不明な選手"
      ],
      waitingB: [
        court.waiting_id?.group2_first?.name || "不明な選手",
        court.waiting_id?.group2_second?.name || "不明な選手"
      ]
    }));
  };

  if (events.message.type === "sticker") {
    try {
      const courtsData = await fetchAndProcessCourtData();
      const carouselMessage = courtCarouselTemplate(courtsData);

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
      const courtsData = await fetchAndProcessCourtData();
      const carouselMessage = courtCarouselTemplate(courtsData);

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
  } else if (events.message.text === "全体試合結果") {
    try {
      const courts = await fetchCourtsWithPlayers();

      courts.sort((a, b) => a.court_number - b.court_number);

      const courtResults = courts.map(court => {
        const nowOrder = court.now_order_id;
        const waitingOrder = court.waiting_id;

        const nowMatch = nowOrder ? `
          現在の試合:
          ${nowOrder.group1_first?.name || "不明"} & ${nowOrder.group1_second?.name || "不明"} vs 
          ${nowOrder.group2_first?.name || "不明"} & ${nowOrder.group2_second?.name || "不明"}
        ` : "現在の試合: なし";

        const waitingMatch = waitingOrder ? `
          待機試合:
          ${waitingOrder.group1_first?.name || "不明"} & ${waitingOrder.group1_second?.name || "不明"} vs 
          ${waitingOrder.group2_first?.name || "不明"} & ${waitingOrder.group2_second?.name || "不明"}
        ` : "待機試合: なし";

        return `
        コート ${court.court_number}:
        ${nowMatch}
        ${waitingMatch}
        `;
      }).join("\n");

      replyMessage = [{
        type: "text",
        text: `全体試合結果:\n${courtResults}`,
      }];

    } catch (error) {
      replyMessage = [{
        type: "text",
        text: "試合結果の取得に失敗しました。",
      }];
    }
  } else {
    replyMessage = [{
      type: "text",
      text: "無効なメッセージです。",
    }];
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
