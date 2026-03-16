"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
            <ScrollyCanvas scrollYProgress={scrollYProgress} />
            <Overlay scrollYProgress={scrollYProgress} />
        </div>
    );
}
