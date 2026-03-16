"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 120;

interface ScrollyCanvasProps {
    scrollYProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Load all images on mount
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    const frameNumber = i.toString().padStart(3, "0");
                    img.src = `/sequence/frame_${frameNumber}_delay-0.066s.png`;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
                imagePromises.push(promise);
            }

            try {
                const resolvedImages = await Promise.all(imagePromises);
                setImages(resolvedImages);
                setLoaded(true);
            } catch (error) {
                console.error("Error loading images", error);
            }
        };

        preloadImages();
    }, []);

    // Function to render a specific frame onto the canvas
    const renderFrame = (index: number) => {
        if (!images[index] || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];

        const { width, height } = canvas.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        } else {
            ctx.clearRect(0, 0, width, height);
        }

        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;

        let renderWidth = width;
        let renderHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            renderHeight = width / imgRatio;
            offsetY = (height - renderHeight) / 2;
        } else {
            renderWidth = height * imgRatio;
            offsetX = (width - renderWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    useEffect(() => {
        if (loaded) {
            renderFrame(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!loaded) return;
        let frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
        if (frameIndex < 0) frameIndex = 0;
        if (frameIndex > FRAME_COUNT - 1) frameIndex = FRAME_COUNT - 1;

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    useEffect(() => {
        const handleResize = () => {
            if (loaded) {
                const currentProgress = scrollYProgress.get();
                const frameIndex = Math.floor(currentProgress * (FRAME_COUNT - 1));
                renderFrame(frameIndex);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded, scrollYProgress]);

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
            <canvas
                ref={canvasRef}
                className="h-full w-full object-cover"
            />
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50 text-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
                        <p className="tracking-widest text-sm uppercase font-light">Loading Experience</p>
                    </div>
                </div>
            )}
        </div>
    );
}
