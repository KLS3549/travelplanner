import { motion } from "framer-motion";

export default function ItineraryResult({ result }) {
  if (!result) return null;

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

  const day = data.daysCount - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center mt-14 px-4"
    >
      <div className="w-full max-w-3xl">

        <div className="bg-[#F7F5F1] rounded-3xl shadow-xl p-10 border border-[#E8E2D6]">

          {/* 旅行資訊 */}
          <div className="text-center mb-10">

            <h2 className="text-3xl font-bold text-[#8A8473]">
              {data.tripTitle}
            </h2>

            <p className="text-[#8A8473] mt-2 text-md font-normal">
              {data.destination} ｜ {day + "晚"} ｜ {data.people}
            </p>

          </div>

          {/* 住宿 */}
          <div className="bg-white rounded-2xl p-6 ">

            <h3 className="font-semibold text-[#8A8473] mb-3 text-md">
              🏨 推薦住宿
            </h3>

            <ul className="space-y-1 text-[#3D3929] text-md font-medium">

              {data.hotels.map((h, i) => (
                <li key={i}>• {h}</li>
              ))}

            </ul>

          </div>

          {/* 淺棕灰短分隔線 */}
          <div className="w-170 h-[1px] bg-stone-300 mx-auto my-9 rounded-full" />  

          {/* 每日行程 */}
          <div className="flex flex-col gap-6">

            {data.days.map((day) => (

              <motion.div
                key={day.day}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border-2 border-[#E8E2D6] p-6 shadow-sm"
              >

                <h3 className="font-semibold text-md text-[#8A8473] mb-4">
                  第 {day.day} 天｜{day.date}
                </h3>

                <div className="flex flex-col gap-4">

                  {day.spots.map((spot, i) => (

                    <div
                      key={i}
                      className="border-l-4 border-[#C9BBA7] pl-4"
                    >

                      <p className="font-semibold text-[#3D3929] text-lg">
                        📍 {spot.name}
                      </p>

                      <div className="text-sm text-stone-400 flex gap-4 mt-1">
                        <span>⏱ {spot.duration}</span>
                      </div>

                      <div className="text-sm text-stone-400 flex gap-4 mt-1">
                        <span>💰 NT$ {spot.cost}</span>
                      </div>

                      {spot.transport && (
                        <div className="text-sm text-stone-400 mt-1">
                          🚌 前往下一站：{spot.transport}
                        </div>
                      )}

                    </div>

                  ))}

                </div>

                {/* 美食 */}
                <div className="mt-4 text-md text-[#8A8473] font-medium">

                  🍜 推薦美食：
                  {day.foods.join("、")}

                </div>

              </motion.div>

            ))}

          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "instant" });
                window.location.reload();
              }}
              className="px-6 py-2 rounded-full border border-[#E8E2D6]
              text-[#8A8473] bg-white font-semibold text-md
              transition transform hover:-translate-y-1 hover:shadow-md
              hover:bg-[#F4F1EA] border-2"
            >
              🔄 重新規劃行程
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
