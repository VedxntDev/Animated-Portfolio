"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NanoBanana() {
    const [clicks, setClicks] = useState(0);

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8, type: "spring" }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
            {clicks > 0 && (
                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-white/60 text-xs font-mono bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md"
                >
                    Bananas: {clicks}
                </motion.span>
            )}
            <button
                onClick={() => setClicks(c => c + 1)}
                className="group relative w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden shadow-lg"
                title="Nano Banana UI"
            >
                <div className="absolute inset-0 bg-yellow-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center" style={{ transformOrigin: "center" }}>
                    🍌
                </span>
            </button>
        </motion.div>
    );
}
