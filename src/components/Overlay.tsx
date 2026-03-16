"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
    // Section 1: "My Name. Creative Developer." (appears from 0 to 15%, fades out by 25%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 0, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // Section 2: "I build digital experiences." (appears 30%, peaks 40%, fades out by 55%)
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.55], [100, -100]);

    // Section 3: "Bridging design and engineering." (appears 65%, peaks 75%, stays to end)
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.6, 1], [100, -50]);

    return (
        <div className="absolute inset-0 w-full pointer-events-none z-10">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">

                {/* Section 1 Center */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute flex flex-col items-center justify-center text-center px-4"
                >
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl text-center">
                        Vedant Singh Baghel.
                    </h1>
                    <p className="mt-4 text-xl md:text-3xl font-light text-white/80 lowercase tracking-widest drop-shadow-lg text-center">
                        Trying to build good things
                    </p>
                </motion.div>

                {/* Section 2 Left */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute left-8 md:left-24 max-w-xl"
                >
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white leading-tight drop-shadow-2xl">
                        I build <br />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">digital experiences.</span>
                    </h2>
                </motion.div>

                {/* Section 3 Right */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute right-8 md:right-24 text-right max-w-xl"
                >
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white leading-tight drop-shadow-2xl">
                        Bridging <br />
                        <span className="text-white/60">design</span> and <br />
                        <span className="text-white/60">engineering.</span>
                    </h2>
                </motion.div>

            </div>
        </div>
    );
}
