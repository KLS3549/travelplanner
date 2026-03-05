"use client"

import React, { useState } from "react";
import TravelForm from "./components/TravelForm";
import ItineraryResult from "./components/ItineraryResult";
import { generateItinerary } from "./services/aiService";

function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    const response = await generateItinerary(formData);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="bg-[#FDF8F0] min-h-screen px-10 py-12">
      {/* 標題區（無 header、無漸層） */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#3D3929]">
          ✈️ V.I.A
        </h1>
        <div className="text-md text-[#8A8473] font-normal">
          --- TRIP TO THE WORLD ---
        </div>
  
        {/* 淺棕灰短分隔線 */}
        <div className="w-240 h-[1px] bg-stone-300 mx-auto my-4 rounded-full" />
  
        <p className="text-3xl font-bold text-[#3D3929]">
        今天想去哪裡冒險？
        </p>

        <p className="text-lg text-[#8A8473] mt-2 font-normal">
        填寫偏好，AI 幫你搞定一切
        </p>
      </div>
  
      <TravelForm onGenerate={handleGenerate} />
  
      {loading && <p className="text-center mt-6 text-[#8A8473] text-lg font-medium">AI 正在為你規劃行程...</p>}
  
      <ItineraryResult result={result} />
    </div>
  );
}

export default App;