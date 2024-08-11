import https from 'https';

export const handleLineMessage = (events: any) => {
  let replyMessage;

  if (events.message.type === "sticker") {
    replyMessage = [
      {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "columns": [
            {
              "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
              "imageBackgroundColor": "#FFFFFF",
              "title": "this is menu",
              "text": "description",
              "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
              },
              "actions": [
                {
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=111"
                },
                {
                  "type": "postback",
                  "label": "Add to cart",
                  "data": "action=add&itemid=111"
                },
                {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://example.com/page/111"
                }
              ]
            },
            {
              "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
              "imageBackgroundColor": "#000000",
              "title": "this is menu",
              "text": "description",
              "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/222"
              },
              "actions": [
                {
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=222"
                },
                {
                  "type": "postback",
                  "label": "Add to cart",
                  "data": "action=add&itemid=222"
                },
                {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://example.com/page/222"
                }
              ]
            }
          ],
          "imageAspectRatio": "rectangle",
          "imageSize": "cover"
        }
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
