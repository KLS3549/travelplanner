export async function generateItinerary(data) {
const prompt = `
你是一位旅遊行程規劃師。

請根據使用者資訊產生「旅遊行程」。

⚠️ 請嚴格使用 JSON 格式輸出，不要加任何說明文字。

格式如下：

{
  "days": [
    {
      "day": 1,
      "title": "城市探索",
      "activities": [
        "上午：景點A",
        "下午：景點B",
        "晚上：夜市美食"
      ],
      "foods": ["餐廳A", "小吃B"]
    }
  ]
}

使用者資訊：
旅遊類型：${data.type}
目的地：${data.destination}
日期：${data.date}
人數：${data.people}
交通方式：${data.transport}
預算：${data.budget}
`;
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });
  
    const json = await res.json();
    return json.choices[0].message.content;
  }