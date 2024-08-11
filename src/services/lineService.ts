import https from 'https';

export const handleLineMessage = (events: any) => {
  let replyMessage;

  if (events.message.type === "sticker") {
    replyMessage = [
      {
        type: "text",
        text: "スタンプありがとう！"
      }
    ];
  } else if (events.message.type === "text") {
    replyMessage = [{
      type: "text",
      text: events.message.text,
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
