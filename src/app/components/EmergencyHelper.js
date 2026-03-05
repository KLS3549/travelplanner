import React, { useState } from "react";
import { generateEmergencyHelp } from "../services/generateEmergencyHelp";

export default function EmergencyHelper({ destination }) {
  const [open, setOpen] = useState(false);
  const [solutions, setSolutions] = useState([]);

  const situations = [
    "突然下雨",
    "店家公休",
    "人潮過多",
    "太累想休息",
    "身體不適"
  ];

  // ⭐ 你的程式碼放在這裡
  const handleSituation = async (situation) => {

    const result = await generateEmergencyHelp(destination, situation);
  
    try {
      const data = JSON.parse(result);
      setSolutions(data.solutions);
    } catch (error) {
      console.error("AI 回傳格式錯誤", error);
    }
  
  };

  return (
    <div className="fixed bottom-6 right-6">

      {/* 小幫手按鈕 */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#C9BBA7] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#8A8473] text-md font-medium"
      >
        🆘 突發狀況小幫手
      </button>

      {/* 對話框 */}
      {open && (
        <div className="mt-4 w-80 bg-white shadow-xl rounded-xl p-4 border border-stone-400">

          <p className="text-[#3D3929] font-medium text-md mb-3">
          嗨！我是你的旅遊急救小幫手 🆘 遇到什麼狀況了嗎？點擊下方標籤或直接告訴我！
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {situations.map((s) => (
              <button
                key={s}
                onClick={() => handleSituation(s)}
                className="border text-[#8A8473] px-3 py-1 rounded-full text-sm hover:bg-[#F4F1EA]"
              >
                {s}
              </button>
            ))}
          </div>

          {solutions.length > 0 && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
                {solutions.map((item, index) => (
                <div
                    key={index}
                    className="bg-[#F4F1EA] border border-stone-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                >
                    <div className="font-semibold text-[#3D3929]">
                    {item.name}
                    </div>

                    <div className="text-sm text-[#8A8473]">
                    {item.reason}
                    </div>

                    <div className="text-xs text-stone-500 mt-1">
                    📍 {item.location}
                    </div>
                </div>
                ))}
            </div>
            )}

        </div>
      )}
    </div>
  );
}