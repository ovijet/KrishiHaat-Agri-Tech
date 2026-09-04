"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Flame } from "lucide-react";

export default function MarketRateTicker() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch("/api/market-rates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRates(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!rates || rates.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white text-xs py-2.5 overflow-hidden border-b border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Badge */}
        <div className="flex items-center space-x-1.5 bg-emerald-600/90 text-white font-bold px-3 py-1 rounded-md text-[11px] shadow-sm flex-shrink-0 z-10 mr-4">
          <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>আজকের সরাসরি বাজারদর:</span>
        </div>

        {/* Ticker marquee */}
        <div className="overflow-hidden relative w-full flex-1">
          <div className="animate-ticker space-x-8">
            {[...rates, ...rates].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="inline-flex items-center space-x-2"
              >
                <span className="font-semibold text-emerald-200">
                  {item.crop}
                </span>
                <span className="bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px] text-slate-300">
                  {item.district}
                </span>
                <span className="font-bold text-white">
                  ৳ {item.todayPrice}
                </span>
                <span className="text-slate-400 text-[10px]">
                  /{item.unit.split("/")[1] || item.unit}
                </span>

                {item.trend === "up" && (
                  <span className="inline-flex items-center text-[10px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800/50">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +
                    {item.todayPrice - item.yesterdayPrice}৳
                  </span>
                )}
                {item.trend === "down" && (
                  <span className="inline-flex items-center text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
                    <TrendingDown className="w-3 h-3 mr-0.5" /> -
                    {item.yesterdayPrice - item.todayPrice}৳
                  </span>
                )}
                {item.trend === "same" && (
                  <span className="inline-flex items-center text-[10px] text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">
                    <Minus className="w-3 h-3 mr-0.5" /> অপরিবর্তিত
                  </span>
                )}
                <span className="text-emerald-800 ml-4 font-bold">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
