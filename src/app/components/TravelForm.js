import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";


export default function TravelForm({ onGenerate }) {
    const [form, setForm] = useState({
        type: "",
        destination: "",
        date: "",
        people: 1,
        transport: "",
        budgetMin: 5000,
        budgetMax: 30000,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(form);
    };

    const STEP = 1000;
    const MIN = 1000;
    const MAX = 100000;

    const travelTypes = [
        { title: "🏔️ 自然探索", desc: "山川湖海、國家公園" },
        { title: "🏛️ 文化歷史", desc: "古蹟博物館、藝術展覽" },
        { title: "🍜 美食之旅", desc: "在地美食、餐廳探索" },
        { title: "🧗 冒險體驗", desc: "極限運動、戶外探索" },
        { title: "🏖️ 休閒放鬆", desc: "溫泉、海灘、SPA" },
        { title: "🛍️ 購物血拼", desc: "市集、百貨、伴手禮" },
    ];

    const transportTypes = [
        { title: "🚗 自駕", desc: "自由安排行程、適合郊區景點" },
        { title: "🚌 大眾運輸", desc: "捷運、公車、火車移動" },
        { title: "🚲 自行車", desc: "適合慢遊城市或河濱" },
        { title: "🚶 步行", desc: "探索市區與巷弄景點" },
    ];

    const foodTypes = [
        { title: "🍱 在地料理", desc: "當地特色料理與傳統美食" },
        { title: "🌮 街頭小吃", desc: "夜市小吃與人氣美食" },
        { title: "🍽️ 精緻餐廳", desc: "高評價餐廳與精緻料理" },
        { title: "☕️ 咖啡甜點", desc: "咖啡館、甜點店與下午茶" },
        { title: "🥬 素食", desc: "健康蔬食與特色素食料理" },
        { title: "🦞 海鮮", desc: "新鮮海產與漁港直送料理" },
    ];

    const hotelTypes = [
        { title: "🏨 飯店", desc: "高品質住宿與完善設施" },
        { title: "🏠 民宿", desc: "體驗在地文化與溫馨氛圍" },
        { title: "🛏️ 青年旅館", desc: "背包客最愛的經濟型住宿" },
        { title: "⛺️ 露營", desc: "在大自然中享受戶外生活" },
    ];

    const nights =
        form.startDate && form.endDate
            ? Math.ceil(
                (new Date(form.endDate) - new Date(form.startDate)) /
                (1000 * 60 * 60 * 24)
            )
            : 0;

  return (
    <div className="flex justify-center mt-10 px-4">
        <form
            onSubmit={handleSubmit}
            className="
            bg-white
            shadow-xl rounded-3xl
            p-10 w-full max-w-2xl
            flex flex-col gap-8
            border border-[#E8E2D6]
            "
        >
            
        <div className="flex flex-col gap-1">
            <div className="text-3xl font-semibold text-[#3D3929]">
                旅遊基本資訊
            </div>

            <div className="text-lg text-stone-400">
                設定目的地、日期與預算
            </div>
        </div>

        {/* ===== 旅遊類型 ===== */}
        <div className="flex flex-col gap-3">
            <SectionTitle>🎯 旅遊類型</SectionTitle>

            <div className="grid grid-cols-3 gap-3 text-[#3D3929]">
                {travelTypes.map((item) => (
                <button
                    key={item.title}
                    type="button"
                    onClick={() => setForm({ ...form, type: item.title })}
                    className={`card-style flex flex-col items-center ${
                    form.type === item.title && "card-active"
                    }`}
                >
                    <span className="text-lg font-medium">{item.title}</span>
                    <span className="text-sm text-stone-400 font-normal">{item.desc}</span>
                </button>
                ))}
            </div>
            </div>
  
        {/* ===== 目的地 ===== */}
        <div className="flex flex-col gap-3">
          <SectionTitle>📍 目的地</SectionTitle>
          <input
            name="destination"
            placeholder="輸入城市或地區，例如：京都、大安區..."
            onChange={handleChange}
            className="input-style placeholder-stone-400 text-lg font-normal"
          />
        </div>
  
        {/* ===== 日期區間 ===== */}
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <SectionTitle>📅 旅遊日期</SectionTitle>

                {nights > 0 && (
                <span className="text-sm text-stone-400 font-semibold">
                    {nights}晚
                </span>
                )}
            </div>

            <div className="flex gap-4 text-lg">
                <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="input-style flex-1"
                />

                <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="input-style flex-1"
                />
            </div>
            </div>
  
        {/* ===== 人數 ===== */}
        <div className="flex flex-col gap-3">
            <SectionTitle>👥 旅遊人數</SectionTitle>
            <input 
                type="number" 
                min="1" 
                name="people" 
                placeholder="輸入人數，例如：2、5..."
                onChange={handleChange} 
                className="input-style text-lg placeholder-stone-400 font-normal"
            />

        </div>
  
        {/* ===== 預算 ===== */}
        <div className="flex flex-col gap-3">
            <SectionTitle>💰 旅遊預算</SectionTitle>

            <Range
                values={[form.budgetMin, form.budgetMax]}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) =>
                setForm({
                    ...form,
                    budgetMin: values[0],
                    budgetMax: values[1],
                })
                }
                renderTrack={({ props, children }) => (
                <div
                    {...props}
                    className="h-2 w-full rounded-full"
                    style={{
                    background: getTrackBackground({
                        values: [form.budgetMin, form.budgetMax],
                        colors: ["#E8E2D6", "#C9BBA7", "#E8E2D6"],
                        min: MIN,
                        max: MAX,
                    }),
                    }}
                >
                    {children}
                </div>
                )}
                renderThumb={({ props }) => (
                <div
                    {...props}
                    className="
                    h-4 w-4 rounded-full
                    bg-[#C9BBA7]
                    shadow-md
                    hover:scale-110
                    transition
                    "
                />
                )}
            />

            <p className="text-center mt-4 font-semibold text-stone-400">
                NT$ {form.budgetMin.toLocaleString()} ～ {form.budgetMax.toLocaleString()}
            </p>
        </div>

        {/* 淺棕灰短分隔線 */}
        <div className="w-150 h-[1px] bg-stone-300 mx-auto my-4 rounded-full" />

        <div className="flex flex-col gap-1">
            <div className="text-3xl font-semibold text-[#3D3929]">
                個人旅遊偏好
            </div>

            <div className="text-lg text-stone-400">
                告訴我們你的偏好，AI 將為你量身打造行程
            </div>
        </div>

        {/* ===== 交通 ===== */}
        <div className="flex flex-col gap-3">
            <SectionTitle>🚗 交通方式</SectionTitle>

            <div className="grid grid-cols-2 gap-3 text-[#3D3929]">
                {transportTypes.map((item) => (
                <button
                    key={item.title}
                    type="button"
                    onClick={() => setForm({ ...form, transport: item.title })}
                    className={`card-style flex flex-col items-center ${
                    form.transport === item.title && "card-active"
                    }`}
                >
                    <span className="text-lg font-medium">{item.title}</span>
                    <span className="text-sm text-stone-400 font-normal">{item.desc}</span>
                </button>
                ))}
            </div>
            </div>

        {/* ===== 住宿類型 ===== */}
        <div className="flex flex-col gap-3">
            <SectionTitle>🏨 住宿類型</SectionTitle>

            <div className="grid grid-cols-2 gap-3 text-[#3D3929]">
                {hotelTypes.map((item) => (
                <button
                    key={item.title}
                    type="button"
                    onClick={() => setForm({ ...form, hotel: item.title })}
                    className={`card-style flex flex-col items-center ${
                    form.hotel === item.title && "card-active"
                    }`}
                >
                    <span className="text-lg font-medium">{item.title}</span>
                    <span className="text-sm text-stone-400 font-normal">{item.desc}</span>
                </button>
                ))}
            </div>
            </div>

        {/* ===== 飲食偏好 ===== */}
        <div className="flex flex-col gap-3">
            <SectionTitle>🍜 飲食偏好</SectionTitle>

            <div className="grid grid-cols-3 gap-3 text-[#3D3929]">
                {foodTypes.map((item) => (
                <button
                    key={item.title}
                    type="button"
                    onClick={() => setForm({ ...form, food: item.title })}
                    className={`card-style flex flex-col items-center ${
                    form.food === item.title && "card-active"
                    }`}
                >
                    <span className="text-lg font-medium">{item.title}</span>
                    <span className="text-sm text-stone-400 font-normal">{item.desc}</span>
                </button>
                ))}
            </div>
            </div>     

        {/* 淺棕灰短分隔線 */}
        <div className="w-150 h-[1px] bg-stone-300 mx-auto my-4 rounded-full" />   
  
        {/* ===== 送出按鈕 ===== */}
        <button
          type="submit"
          className="
            bg-[#C9BBA7]
            text-white font-bold text-lg
            py-4 rounded-2xl
            hover:bg-[#8A8473]
            hover:scale-105
            shadow-md
            transition-all
          "
        >
          ✨ 一鍵生成專屬行程
        </button>
  
        {/* ===== 共用樣式 ===== */}
        <style>{`
          .input-style {
            width: 100%;
            padding: 12px 14px;
            border-radius: 14px;
            border: 2px solid #E8E2D6;
            outline: none;
            transition: 0.2s;
            color: #3D3929;
          }

          /* 🔥 關鍵：關掉 Chrome autofill 藍色 */
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px white inset !important;
            -webkit-text-fill-color: #3D3929 !important;
          }
  
          .input-style:focus {
            border-color: #8A8473;
            box-shadow: 0 0 0 3px rgba(138,132,115,0.2);
          }
  
          .card-style {
            padding: 12px;
            border-radius: 16px;
            border: 2px solid #E8E2D6;
            background: white;
            font-weight: 500;
            transition: 0.2s;
          }
  
          .card-style:hover {
            background: #F4F1EA;
            transform: translateY(-2px);
          }
  
          .card-active {
            background: #F4F1EA;
            color: #3D3929;
            border-color: #D8D2C4;
          }
        `}</style>
      </form>
    </div>
  );
  
  
  /* ===== 小元件：標題背景條 ===== */
  function SectionTitle({ children }) {
    return (
      <div className="bg-[#F4F1EA] text-[#8A8473] px-4 py-2 rounded-xl font-semibold w-fit text-md">
        {children}
      </div>
    );
  }
}