import { motion } from "framer-motion";

export default function ItineraryResult({ result }) {
  if (!result) return null;

  /* ========= 只做 JSON parse ========= */
  let data;

  try {
    data = JSON.parse(result);
  } catch {
    return (
      <p className="text-center mt-10 text-red-500">
        行程格式錯誤，請重新產生
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mt-14 px-4"
    >
      {/* 外框 */}
      <div className="bg-[#F7F5F1] rounded-3xl shadow-xl p-10 border border-[#E8E2D6]">

        {/* 標題 */}
        <h2 className="text-3xl font-bold text-[#8A8473] mb-8">
          🗺️ AI 推薦行程
        </h2>

        {/* ========= 每天卡片 ========= */}
        <div className="grid md:grid-cols-2 gap-6">
          {data.days.map((day) => (
            <motion.div
              key={day.day}
              whileHover={{ y: -4 }}
              className="
                bg-white
                rounded-2xl
                border-2 border-[#E8E2D6]
                p-6
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              {/* 天數標題 */}
              <h3 className="font-bold text-lg text-[#8A8473] mb-3">
                第 {day.day} 天｜{day.title}
              </h3>

              {/* 行程列表 */}
              <ul className="space-y-2 text-[#3D3929]">
                {day.activities.map((a, i) => (
                  <li key={i}>• {a}</li>
                ))}
              </ul>

              {/* 美食區 */}
              <div className="mt-4 text-sm text-[#8A8473]">
                🍜 推薦美食：{day.foods.join("、")}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 複製按鈕 */}
        <button
          onClick={() => navigator.clipboard.writeText(result)}
          className="
            mt-10
            bg-[#B7B1A1]
            text-white font-semibold
            px-6 py-3
            rounded-2xl
            hover:bg-[#A39D8C]
            hover:scale-105
            transition
          "
        >
          📋 複製全部行程
        </button>
      </div>
    </motion.div>
  );
}