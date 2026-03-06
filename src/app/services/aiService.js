export async function generateItinerary(data) {

    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    
    const days =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    
    const prompt = `
    你是一位專業旅遊規劃師。
    
    請為旅客規劃完整旅遊行程。
    
    ⚠️ 必須輸出純 JSON，不要任何說明文字。
    
    JSON 格式：
    
    {
     "tripTitle":"旅行名稱",
     "destination":"目的地",
     "daysCount":"3晚",
     "people":"2人",
     "hotels":[
       "飯店名稱1",
       "飯店名稱2",
       "飯店名稱3"
     ],
     "days":[
       {
         "day":1,
         "date":"2026-03-10",
         "title":"城市探索",
         "spots":[
           {
             "name":"景點名稱",
             "transport":"交通方式(最後一個景點留空)",
             "duration":"停留時間",
             "cost":"預估花費(NT$)"
           }
         ],
         "foods":[
           "真實餐廳名稱",
           "真實餐廳名稱"
         ]
       }
     ]
    }
    
    規則：
    
    1. 必須產生 ${days} 天
    2. hotels 必須是真實飯店或民宿名稱
    3. foods 必須是真實餐廳
    4. 景點順路
    5. 每天最後一個景點 transport 留空
    6. 景點必須在 ${data.destination} 附近
    7. 符合預算 ${data.budget}
    
    使用者資訊：
    
    旅遊類型：${data.type}
    目的地：${data.destination}
    開始日期：${data.startDate}
    結束日期：${data.endDate}
    人數：${data.people}
    交通方式：${data.transport}
    住宿類型：${data.hotel}
    飲食偏好：${data.food}
    預算：${data.budget}
    
    `;
    
    const res = await fetch("http://localhost:5001/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });
  
    const json = await res.json();
    return json.choices[0].message.content;
}
