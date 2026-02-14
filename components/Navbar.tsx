import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../constants';

interface NavbarProps {
    onNavigateHome: () => void;
    onNavigateWizard?: () => void;
    activeView: 'home' | 'ecommerce' | 'wizard';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateWizard, activeView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (activeView !== 'home') {
        onNavigateHome();
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  // --- NATIVE CONTACT SAVE LOGIC ---
  const handleSaveContact = async () => {
    // VCard 3.0 Standard
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
N:Terzioğlu;Yusuf;Ziya;;
FN:Yusuf Ziya Terzioğlu
ORG:YZT Digital
TITLE:Dijital Mimar & Full-Stack Developer
TEL;type=CELL;type=VOICE;type=pref:${SOCIAL_LINKS.phone}
EMAIL;type=INTERNET;type=WORK:${SOCIAL_LINKS.email}
URL:${SOCIAL_LINKS.linkedin}
URL:${SOCIAL_LINKS.behance}
NOTE:Modern Web Çözümleri ve Dijital Mimari Hizmetleri.
END:VCARD`;

    const fileName = "yusuf_ziya_terzioglu.vcf";
    const file = new File([vCardContent], fileName, { type: "text/vcard" });

    // 1. Try Native Share (Mobile Experience)
    // This allows users to "Assign to Contact" directly on iOS/Android
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
                title: 'Yusuf Ziya Terzioğlu',
                text: 'İletişim bilgilerini kaydet.',
            });
            return; // Success, exit
        } catch (error) {
            console.log("Share cancelled or failed", error);
        }
    }

    // 2. Fallback: Direct Download (Desktop/Unsupported Browsers)
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* 
        1. THE LOGO - Fixed Anchor (Top Left)
      */}
      <div 
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 mix-blend-difference cursor-pointer group"
        onClick={onNavigateHome}
      >
         <span className="text-white font-black text-2xl md:text-4xl tracking-tighter transition-transform duration-300 group-hover:scale-105 block">
            YZT.
         </span>
      </div>

      {/* 
        2. MOBILE QUICK ACTION: Add to Contacts (Top Right - Fixed)
        This ensures users can add contact immediately without scrolling down.
      */}
      <div className="fixed top-6 right-6 md:hidden z-50">
          <button 
            onClick={handleSaveContact}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full shadow-lg active:scale-95 transition-all"
          >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
              <span className="text-xs font-bold uppercase tracking-wide">Rehbere Ekle</span>
          </button>
      </div>

      {/* 
        3. FLOATING DYNAMIC MENU (Desktop Centered / Mobile Hidden when Scrolled) 
      */}
      <nav 
        className={`
            fixed z-40 top-6 md:top-8 h-12 md:h-14 rounded-full backdrop-blur-2xl border border-white/10 shadow-2xl
            transition-all duration-[0.8s] ease-[cubic-bezier(0.76,0,0.24,1)] flex items-center overflow-hidden
            scale-75 md:scale-100 origin-center
            hidden md:flex 
            ${isScrolled 
              ? 'left-[calc(100%-24px)] md:left-[calc(100%-3rem)] -translate-x-full bg-white/10 w-12 md:w-14 justify-center hover:bg-white/20' // Scrolled: Compact Icon Right
              : 'left-1/2 -translate-x-1/2 bg-[#161617]/80 w-auto min-w-[320px] max-w-[360px] justify-between px-6 md:px-8' // Top: Compact Center
            }
        `}
      >
        
        {/* Navigation Links */}
        <div className={`
            flex items-center justify-between w-full
            transition-all duration-500 ease-in-out
            ${isScrolled ? 'translate-x-20 opacity-0 absolute' : 'translate-x-0 opacity-100'}
        `}>
            {activeView === 'home' ? (
                <>
                    <button 
                        onClick={() => scrollToSection('portfolio')} 
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group whitespace-nowrap"
                    >
                        Portfolyo
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button 
                        onClick={() => scrollToSection('services')} 
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group whitespace-nowrap mx-4"
                    >
                        Hizmetler
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button 
                        onClick={() => scrollToSection('contact')} 
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group whitespace-nowrap"
                    >
                        İletişim
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                    </button>
                </>
            ) : (
                // Links for E-commerce View (simplified)
                <>
                    <button 
                        onClick={onNavigateHome} 
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group whitespace-nowrap"
                    >
                        ← Ana Sayfa
                    </button>
                    <span className="mx-auto"></span>
                    <button 
                         onClick={onNavigateWizard}
                         className="text-sm font-medium text-white bg-apple-blue px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        Teklif Al
                    </button>
                </>
            )}
        </div>

        {/* Menu Icon (Hamburger/Close equivalent when scrolled) */}
        <div 
            className={`absolute flex items-center justify-center pointer-events-none transition-all duration-500 delay-100 ${isScrolled ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}
        >
            <svg onClick={onNavigateHome} className="w-5 h-5 md:w-6 md:h-6 text-white pointer-events-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </div>

      </nav>
    </>
  );
};

export default Navbar;