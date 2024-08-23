export const courtCarouselTemplate = (courts: { courtName: string, teamA: string[], teamB: string[], waitingA: string[], waitingB: string[] }[]) => {
  const bubbles = courts.map(court => ({
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: court.courtName,
          size: "xl",
          weight: "bold"
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "TEAM",
              flex: 1,
              color: "#111111",
              weight: "bold",
              align: "start",
              size: "sm"
            },
            {
              type: "text",
              text: "Player1",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "bold",
              align: "start"
            },
            {
              type: "text",
              text: "Player2",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "bold",
              align: "start"
            }
          ]
        },
        {
          type: "separator"
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            },
            {
              type: "text",
              text: court.teamA[0] || "N/A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            },
            {
              type: "text",
              text: court.teamA[1] || "N/A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            }
          ]
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "B",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            },
            {
              type: "text",
              text: court.teamB[0] || "N/A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            },
            {
              type: "text",
              text: court.teamB[1] || "N/A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            }
          ]
        },
        {
          type: "separator"
        },
        {
          type: "text",
          text: "コート待機選手",
          size: "md",
          color: "#111111",
          weight: "regular"
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            },
            {
              type: "text",
              text: court.waitingA[0] || "N/A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            },
            {
              type: "text",
              text: court.waitingA[1] || "N/A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            }
          ]
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "B",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            },
            {
              type: "text",
              text: court.waitingB[0] || "N/A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            },
            {
              type: "text",
              text: court.waitingB[1] || "N/A",
              flex: 1,
              size: "sm",
              color: "#111111",
              weight: "regular",
              align: "start"
            }
          ]
        }
      ]
    }
  }));

  return {
    type: "carousel",
    contents: bubbles
  };
};

export const allProgressCarouselTemplate = (
  progresses: {
    qualifying: string;
    groupName: string[];
    resultWin: string[];
    resultLose: string[];
  }[]
) => {
  const bubbles = progresses.map((progress) => ({
    type: "bubble",
    header: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: progress.qualifying,
          weight: "bold",
          size: "xl",
          margin: "md",
        },
      ],
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: progress.groupName.map((groupName, index) => ({
        type: "box",
        layout: "horizontal",
        margin: "md",
        contents: [
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: groupName || "N/A",
                size: "sm",
                color: "#555555",
              },
            ],
            flex: 3,
          },
          {
            type: "text",
            text: progress.resultWin[index] || "0",
            size: "sm",
            color: "#ff4500",
            align: "end",
          },
          {
            type: "text",
            text: progress.resultLose[index] || "0",
            size: "sm",
            color: "#111111",
            align: "end",
          },
        ],
      })),
    },
  }));

  return {
    type: "carousel",
    contents: bubbles,
  };
};
