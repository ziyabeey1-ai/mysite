import React, { useState, useRef, useEffect } from 'react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle both Mouse and Touch events for mobile compatibility
  const handleMove = (clientX: number, clientY: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
      setIsHovering(true);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => handleMove(e.clientX, e.clientY);
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleMove(e.touches[0].clientX, e.touches[0].clientY);

  return (
    <section 
        id="hero" 
        ref={containerRef}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="section-stack h-screen relative bg-black flex flex-col items-center justify-center overflow-hidden cursor-crosshair z-0 touch-none"
    >
      
      {/* 1. ENGINEERING GRID BACKGROUND (Subtle Technical Feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full select-none pointer-events-none">
        
        {/* TOP BADGE */}
        <div className="mb-6 md:mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs font-mono tracking-[0.2em] text-gray-400 uppercase backdrop-blur-md">
                Estetik & Mühendislik
            </span>
        </div>

        {/* 3. THE INTERACTIVE SPOTLIGHT TYPOGRAPHY */}
        <div className="relative group text-center w-full px-4">
            
            {/* LAYER 1: The Dim Base Text (Always Visible but Dark) */}
            <h1 className="text-[18vw] md:text-[13vw] leading-[0.85] font-black tracking-tighter text-[#111] transition-colors duration-700">
                YUSUF <br/> ZİYA
            </h1>

            {/* LAYER 2: The Highlight Text (Revealed by Mask/Flashlight) */}
            {/* On mobile, we make the spotlight a bit larger to account for finger obstruction */}
            <div 
                className="absolute inset-0 top-0 left-0 w-full h-full"
                style={{
                    maskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                    opacity: isHovering ? 1 : 0, 
                    transition: 'opacity 0.3s ease'
                }}
            >
                <h1 className="text-[18vw] md:text-[13vw] leading-[0.85] font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    YUSUF <br/> ZİYA
                </h1>
            </div>

            {/* LAST NAME (Static Accent) */}
             <div className="mt-4 md:mt-6 overflow-hidden">
                <p className="text-xl md:text-3xl font-light tracking-[0.4em] md:tracking-[0.6em] text-gray-600 uppercase animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
                    Terzioğlu
                </p>
             </div>
        </div>

        {/* 4. BOTTOM CTA */}
        <div className="absolute bottom-10 md:bottom-16 flex flex-col items-center gap-6 animate-fade-in opacity-0 px-6" style={{ animationDelay: '1.2s' }}>
            <p className="max-w-xs md:max-w-md text-center text-xs md:text-sm text-gray-500 leading-relaxed font-mono">
                Web deneyimlerini sadece kodlamıyorum, <br className="hidden md:block" /> 
                markanızın dijital mirasını inşa ediyorum.
            </p>

            <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group bg-black/50 backdrop-blur-sm"
                aria-label="Scroll Down"
            >
                <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;