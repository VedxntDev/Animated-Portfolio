import React from "react";

const PROJECT_DATA = [
    {
        title: "UI/UX Portfolio",
        category: "UI/UX Design",
        year: "2025",
        description: "A comprehensive showcase of user experience principles and interface designs.",
        link: "https://vedxntdev.github.io/Portfolio/"
    }
];

export default function Projects() {
    return (
        <section className="relative z-20 min-h-screen bg-black text-white px-6 md:px-24 py-32 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Featured Projects</h2>
                    <div className="w-24 h-1 bg-white/20"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* Subtle background glow effect behind grid */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-600/20 blur-[120px] rounded-full point-events-none"></div>

                    {PROJECT_DATA.map((project, i) => (
                        <a
                            key={i}
                            href={project.link || "#"}
                            target={project.link ? "_blank" : "_self"}
                            rel={project.link ? "noopener noreferrer" : ""}
                            className="group relative z-10 flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] cursor-pointer min-h-[300px]"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-12">
                                    <span className="text-sm font-light uppercase tracking-widest text-white/50">{project.category}</span>
                                    <span className="text-sm font-light text-white/40">{project.year}</span>
                                </div>
                                <h3 className="text-3xl font-medium tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
