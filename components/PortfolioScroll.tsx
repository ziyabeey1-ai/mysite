import React, { useRef, useEffect, useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../constants';

interface PortfolioScrollProps {
  onOpenProject: (id: number) => void;
}

const PortfolioScroll: React.FC<PortfolioScrollProps> = ({ onOpenProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const featuredProject = PORTFOLIO_PROJECTS[0]; // NOIR (ID: 1)
  const sliderProjects = PORTFOLIO_PROJECTS.slice(1);

  // Desktop Only: Scroll Progress Calculation
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      if (!containerRef.current || !stickyRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const startOffset = containerTop;
      const endOffset = containerTop + containerHeight - windowHeight;
      
      let progress = (scrollY - startOffset) / (endOffset - startOffset);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateX = -(scrollProgress * 100); 

  return (
    <div id="portfolio" className="relative z-10 bg-black shadow-2xl">
        
        {/* 1. SECTION: HEROIC FEATURED PROJECT (NOIR) */}
        {/* Adjusted padding and height to prevent overlap with title */}
        <div className="min-h-screen w-full relative flex items-end md:items-center justify-center overflow-hidden border-t border-white/10 bg-black group py-20 md:py-0">
            
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                    src={featuredProject.imageUrl} 
                    alt={featuredProject.title}
                    className="w-full h-full object-cover opacity-60 scale-100 group-hover:scale-105 transition-transform duration-[3s] ease-in-out"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
            </div>

            {/* Editorial Content Layout */}
            <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 h-full flex flex-col justify-end md:justify-center">
                <div className="hidden md:flex justify-between items-start absolute top-32 left-0 w-full px-12 border-t border-white/20 pt-6">
                    <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Case Study 01</div>
                    <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Istanbul / Paris</div>
                </div>

                <div className="flex flex-col md:flex-row items-end md:items-end justify-between gap-8 md:gap-24">
                    <div className="flex-1 w-full">
                         <div className="overflow-hidden mb-4">
                            <span className="inline-block text-white/80 font-mono text-xs md:text-sm tracking-[0.3em] uppercase border border-white/20 px-3 py-1 rounded-full backdrop-blur-md bg-black/30">
                                {featuredProject.category}
                            </span>
                         </div>
                        {/* Title - Fixed sizing for mobile to avoid wrapping issues */}
                        <h2 className="text-5xl sm:text-7xl md:text-[9rem] leading-[0.85] font-black text-white tracking-tighter mb-2 mix-blend-overlay opacity-90">
                            NOIR
                        </h2>
                        <h2 className="text-5xl sm:text-7xl md:text-[9rem] leading-[0.85] font-serif italic font-thin text-white tracking-tighter mb-8 md:mb-10">
                            Fashion
                        </h2>
                        
                        {/* Mobile Only Button - Visible immediately */}
                        <button 
                            onClick={() => onOpenProject(featuredProject.id)}
                            className="md:hidden w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 rounded-lg"
                        >
                            İncele
                        </button>
                    </div>

                    <div className="hidden md:block w-[400px] bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
                        <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                            <span>Client: Noir Studio</span>
                            <span>Year: 2024</span>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed mb-8 font-light">
                            {featuredProject.description}
                        </p>
                        
                        <button 
                            onClick={() => onOpenProject(featuredProject.id)}
                            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group-btn"
                        >
                            <span>Siteyi Görüntüle</span>
                            <svg className="w-4 h-4 transform group-btn-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        {/* 2. SECTION: REFERENCES SCROLL TRACK */}
        <div ref={containerRef} className="relative h-auto md:h-[300vh] bg-[#050507]">
            
            {/* --- MOBILE LAYOUT: Native Horizontal Scroll --- */}
            {/* Increased padding-top to prevent overlap with previous section */}
            <div className="md:hidden pt-24 pb-20 px-4">
                 <div className="mb-8 px-2">
                    <h3 className="text-3xl font-semibold text-white tracking-tight">Seçkin Referanslar</h3>
                    <p className="text-gray-400 text-sm mt-2">Projeleri incelemek için kartlara tıklayın.</p>
                 </div>
                 
                 <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 scrollbar-hide">
                    {sliderProjects.map((project) => (
                        <div 
                            key={project.id} 
                            onClick={() => onOpenProject(project.id)}
                            className="snap-center shrink-0 w-[85vw] h-[50vh] relative group rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-[#161617]"
                        >
                             <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1 block">
                                    Canlı Önizleme
                                </span>
                                <h4 className="text-2xl font-bold text-white mb-2">{project.title}</h4>
                                <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>


            {/* --- DESKTOP LAYOUT: Sticky Animated Scroll --- */}
            <div ref={stickyRef} className="hidden md:flex sticky top-0 h-screen overflow-hidden flex-col justify-center">
                <div className="px-24 mb-12 absolute top-24 z-20">
                    <h3 className="text-5xl font-semibold text-white tracking-tight">
                        Seçkin Referanslar
                    </h3>
                </div>

                <div 
                    className="flex gap-16 px-24 will-change-transform perspective-1000 items-center h-full"
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {sliderProjects.map((project) => (
                        <div 
                            key={project.id} 
                            onClick={() => onOpenProject(project.id)} 
                            className="min-w-[45vw] h-[60vh] relative group rounded-3xl overflow-hidden cursor-pointer tilt-card border border-white/5 bg-[#161617]"
                        >
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                            
                            {/* Hover Overlay for Click Hint */}
                            <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="px-6 py-3 bg-white text-black rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    Canlı Siteyi İncele
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 p-12 w-full">
                                <span className="text-gray-300 text-sm font-medium uppercase tracking-wider mb-2 block">
                                    {project.category}
                                </span>
                                <h4 className="text-4xl font-bold text-white tracking-tight mb-2">
                                    {project.title}
                                </h4>
                                <p className="text-gray-400 text-lg line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PortfolioScroll;