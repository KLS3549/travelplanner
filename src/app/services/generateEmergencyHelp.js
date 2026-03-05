export async function generateEmergencyHelp(destination, situation) {

    const prompt = `
    你是旅遊突發狀況助手。

    旅客目前在：${destination}

    遇到狀況：${situation}

    請推薦 3 個替代方案。

    ⚠️ 必須輸出 JSON，不要任何文字

    格式：

    {
    "solutions":[
    {
        "name":"地點名稱",
        "reason":"為什麼適合",
        "location":"地點區域"
    }
    ]
    }

    規則：

    如果是「突然下雨」
    → 推薦室內景點

    如果是「太累想休息」
    → 推薦咖啡廳

    如果是「店家公休」
    → 推薦替代景點

    如果是「身體不適」
    → 推薦醫院或診所

    地點必須在 ${destination} 附近
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