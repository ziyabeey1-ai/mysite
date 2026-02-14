import React, { useState, useEffect, useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';

interface ContactProps {
    onLaunchWizard?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onLaunchWizard }) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  
  // Terminal State
  const [lines, setLines] = useState<string[]>([
    "> initializing yzt_protocol v2.4...",
    "> connection established.",
    "> type 'help' for available commands.",
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);

  // --- TERMINAL LOGIC ---
  useEffect(() => {
    if (isTerminalOpen) {
        const timer = setTimeout(() => {
            handleCommand("contact_info", false); 
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    if (shouldAutoScroll && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        setShouldAutoScroll(false);
    }
  }, [lines, shouldAutoScroll]);

  const handleCommand = (cmd: string, autoScroll = true) => {
    let output: string[] = [];
    switch (cmd.toLowerCase().trim()) {
        case 'help':
            output = [
                "  > available commands:",
                "  > contact_info  : display contact details",
                "  > wizard        : start project price calculator",
                "  > clear         : clear terminal",
            ];
            break;
        case 'contact_info':
            output = [
                "  > fetching data...",
                "  --------------------------------",
                `  > PHONE:    <a href="tel:${SOCIAL_LINKS.phone}" class="text-green-400 hover:underline">${SOCIAL_LINKS.phone}</a>`,
                `  > EMAIL:    <a href="mailto:${SOCIAL_LINKS.email}" class="text-blue-400 hover:underline break-all">${SOCIAL_LINKS.email}</a>`,
                `  > LINKEDIN: <a href="${SOCIAL_LINKS.linkedin}" target="_blank" class="text-blue-400 hover:underline">linkedin.com/in/ziyabey</a>`,
                "  --------------------------------",
            ];
            break;
        case 'wizard':
            if (onLaunchWizard) onLaunchWizard();
            return;
        case 'clear':
            setLines(["> terminal cleared."]);
            return;
        default:
            output = [`  > command not found: ${cmd}`];
    }
    setLines(prev => [...prev, `> ${cmd}`, ...output]);
    if (autoScroll) setShouldAutoScroll(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleCommand(input, true);
        setInput('');
    }
  };

  // --- NATIVE CONTACT SAVE LOGIC ---
  const handleSaveContact = async () => {
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
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
                title: 'Yusuf Ziya Terzioğlu',
                text: 'İletişim bilgilerini kaydet.',
            });
            return;
        } catch (error) {
            console.log("Share cancelled or failed", error);
        }
    }

    // 2. Fallback: Direct Download (Desktop)
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
    <section id="contact" className="section-stack min-h-screen bg-black flex flex-col justify-center items-center py-20 px-4 md:py-32 md:px-6 relative overflow-hidden z-40 border-t border-white/10 shadow-2xl preserve-3d">
      
      {/* Background FX */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[500px] bg-indigo-900/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10">
        
        {/* HEADER */}
        <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-7xl font-semibold text-white tracking-tighter mb-6">
                Bağlantı Kur.
            </h2>
            <p className="text-gray-400 text-lg mb-8">Projeleriniz için sistem hazır.</p>
        </div>

        {/* TERMINAL VIEW */}
        <div 
            className="bg-[#0c0c0c]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden w-full mx-auto transform transition-transform duration-500 hover:scale-[1.01] hover:rotate-x-1 animate-fade-in mb-12"
            style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)', minHeight: '400px' }}
        >
            {/* Window Header */}
            <div className="bg-[#1c1c1f] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-auto md:ml-4 text-[10px] md:text-xs text-gray-500 font-mono">yzt_terminal — -zsh</div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 md:p-8 font-mono text-xs md:text-base text-gray-300 h-full overflow-y-auto cursor-text min-h-[300px]" onClick={() => inputRef.current?.focus()}>
                {lines.map((line, i) => (
                    <div key={i} className="mb-2 break-words leading-relaxed" dangerouslySetInnerHTML={{ __html: line }} />
                ))}
                
                <div className="flex items-center gap-2 mt-4 text-green-400">
                    <span>➜</span>
                    <span>~</span>
                    <input 
                        ref={inputRef}
                        id="term-input"
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent outline-none border-none flex-1 text-white caret-white w-full"
                        autoComplete="off"
                    />
                </div>
                <div ref={bottomRef}></div>
            </div>
        </div>

        {/* ACTIONS */}
        <div className="text-center">
            <p className="text-gray-500 mb-6 text-sm">Bir sonraki adımınız ne olacak?</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {/* WIZARD BUTTON */}
                <button 
                    onClick={onLaunchWizard}
                    className="w-full md:w-auto px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 group flex items-center justify-center gap-3"
                >
                    <span>Proje Sihirbazını Başlat</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </button>

                {/* SAVE CONTACT BUTTON (vCard) */}
                <button 
                    onClick={handleSaveContact}
                    className="w-full md:w-auto px-10 py-5 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300 group flex items-center justify-center gap-3 backdrop-blur-sm"
                >
                    <span>Rehbere Ekle</span>
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;