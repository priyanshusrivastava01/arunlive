import { useEffect, useState } from "react";

const START_PERCENT = 91;
const MAX_PERCENT = 99;
const CYCLE_DURATION = 30 * 60 * 1000; // 30 minutes

export default function useSoldOutProgress() {
  const [percent, setPercent] = useState(START_PERCENT);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const now = Date.now();

    let cycleStart = localStorage.getItem("soldCycleStartTime");
    let storedPercent = localStorage.getItem("soldOutPercent");

    // ⏱️ First time OR cycle expired → reset
    if (!cycleStart || now - Number(cycleStart) >= CYCLE_DURATION) {
      localStorage.setItem("soldCycleStartTime", now.toString());
      localStorage.setItem("soldOutPercent", START_PERCENT.toString());
      setPercent(START_PERCENT);
    } else {
      setPercent(storedPercent ? Number(storedPercent) : START_PERCENT);
    }

    // ⬆️ Increment logic
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= MAX_PERCENT) return prev;

        const next = Math.round((prev + 0.1) * 10) / 10;
        localStorage.setItem("soldOutPercent", next.toString());
        return next;
      });
    }, 60 * 1000); // every 1 minute +0.1%

    return () => clearInterval(interval);
  }, []);

  // 🔔 Popup event listener
  useEffect(() => {
    const handler = () => {
      setPercent((prev) => {
        if (prev >= MAX_PERCENT) return prev;

        const next = Math.round((prev + 0.1) * 10) / 10; // popup = +0.1%
        localStorage.setItem("soldOutPercent", next.toString());
        return next;
      });
    };

    window.addEventListener("joinedPopup", handler);
    return () => window.removeEventListener("joinedPopup", handler);
  }, []);

  return percent;
}
