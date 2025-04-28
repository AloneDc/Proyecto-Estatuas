import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const targetDate = new Date("2025-07-21T00:00:00");

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return setTimeLeft(null);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <motion.div
      className="fixed top-28 right-4 z-40 bg-white/90 shadow-md backdrop-blur border border-blue-100 rounded-lg px-4 py-3 text-sm text-gray-800 hidden lg:block"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-blue-700 font-semibold mb-2 text-xs text-center uppercase tracking-wide">
        Bicentenario
      </div>
      <div className="flex justify-center gap-3 font-mono text-xs">
        <Time label="D" value={timeLeft.days} />
        <Time label="H" value={timeLeft.hours} />
        <Time label="M" value={timeLeft.minutes} />
        <Time label="S" value={timeLeft.seconds} />
      </div>
    </motion.div>
  );
}

function Time({ label, value }) {
  return (
    <div className="text-center">
      <div className="font-bold text-blue-800">{value}</div>
      <div className="text-gray-500">{label}</div>
    </div>
  );
}
