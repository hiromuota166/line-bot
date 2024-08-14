export const courtTemplate = (courtName: string, teamA: string[], teamB: string[], waitingA: string[], waitingB: string[]) => {
  return {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": courtName,
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
              "text": teamA[0] || "N/A",
              "flex": 1,
              "size": "sm",
              "color": "#111111",
              "weight": "regular",
              "align": "start"
            },
            {
              "type": "text",
              "text": teamA[1] || "N/A",
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
              "text": "A",
              "flex": 1,
              "size": "sm",
              "color": "#111111",
              "weight": "regular",
              "align": "start"
            },
            {
              "type": "text",
              "text": teamB[0] || "N/A",
              "flex": 1,
              "size": "sm",
              "color": "#111111",
              "weight": "regular",
              "align": "start"
            },
            {
              "type": "text",
              "text": teamB[1] || "N/A",
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
              "text": waitingA[0] || "N/A",
              "flex": 1,
              "size": "sm",
              "color": "#111111",
              "weight": "regular",
              "align": "start"
            },
            {
              "type": "text",
              "text": waitingA[1] || "N/A",
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
              "text": "A",
              "flex": 1,
              "size": "sm",
              "color": "#111111",
              "weight": "regular",
              "align": "start"
            },
            {
              "type": "text",
              "text": waitingB[0] || "N/A",
              "flex": 1,
              "size": "sm",
              "color": "#111111",
              "weight": "regular",
              "align": "start"
            },
            {
              "type": "text",
              "text": waitingB[1] || "N/A",
              "flex": 1,
              "size": "sm",
              "color": "#111111",
              "weight": "regular",
              "align": "start"
            }
          ]
        },
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
  };
};
