import React, { useState } from "react";
import { generateEmergencyHelp } from "../services/generateEmergencyHelp";

export default function EmergencyHelper({ destination }) {
  const [open, setOpen] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [loading, setLoading] = useState(false);

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
  
  const handleSituationClick = async (s) => {
    setActiveTag(s);
    setLoading(true);
    setSolutions([]);
  
    await handleSituation(s); // 原本你的 AI function
  
    setLoading(false);
  };


  return (
    <div className="fixed bottom-6 right-6">

      {/* 小幫手按鈕 */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#C9BBA7] text-white px-4 py-3 rounded-full shadow-lg
        hover:bg-[#8A8473] text-md font-medium
        transition transform hover:-translate-y-1 hover:shadow-xl"
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
                onClick={() => handleSituationClick(s)}
                className={`
                  border px-3 py-1 rounded-full text-sm transition transform
                  hover:-translate-y-1 hover:shadow-md
              
                  ${activeTag === s
                    ? "bg-[#C9BBA7] text-white border-[#C9BBA7]"
                    : "text-[#8A8473] hover:bg-[#F4F1EA] border-2"
                  }
                `}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSolutions([]);
              setActiveTag(null);
            }}
            className="px-3 py-1 text-sm rounded-full border border-[#C9BBA7]
            text-[#C9BBA7] bg-white font-bold 
            transition transform hover:-translate-y-1 hover:shadow-md
            hover:bg-[#F4F1EA] mt-3 mb-5"
          >
            RESET
          </button>

          {loading && (
            <div className="text-center text-sm text-stone-500 py-4">
              🤖 AI 正在幫你解決...
            </div>
          )}

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