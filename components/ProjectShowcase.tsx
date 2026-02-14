
import React, { useEffect, useState } from 'react';
import EcommerceView from './EcommerceView';

interface ProjectShowcaseProps {
    projectId: number;
    onBack: () => void;
    onLaunchWizard?: () => void;
    onSwitchProject?: (id: number) => void;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projectId, onBack, onLaunchWizard, onSwitchProject }) => {
    // Ensure we start at the top of the new "page"
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);

    // --- INTERNAL STATE FOR INTERACTIVITY ---
    const [cartCount, setCartCount] = useState(0);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Toast Notification Logic
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleAddToCart = () => {
        setCartCount(prev => prev + 1);
        showToast("Ürün sepete eklendi");
    };

    const handleDownload = () => {
        showToast("Rapor indiriliyor...");
        setTimeout(() => showToast("İndirme tamamlandı"), 1500);
    };

    const handleMessage = () => {
        showToast("Mesajınız ekibe iletildi");
    };

    // --- RENDER HELPER: TOAST ---
    const Toast = () => (
        toastMessage ? (
            <div className="fixed top-20 right-4 md:right-6 z-[120] animate-fade-in max-w-[90vw]">
                <div className="bg-black/80 backdrop-blur-md text-white px-4 py-3 md:px-6 rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
                    <span className="text-xs md:text-sm font-medium">{toastMessage}</span>
                </div>
            </div>
        ) : null
    );

    // --------------------------------------------------------
    // ID 1: NOIR - FASHION (Interactive & Mobile Optimized)
    // --------------------------------------------------------
    if (projectId === 1) {
        return (
            <div className="fixed inset-0 z-[100] bg-[#e8e6e1] overflow-y-auto font-serif text-stone-900 animate-fade-in custom-scrollbar">
                <Toast />
                {/* Navigation Bar */}
                <nav className="sticky top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-4 bg-[#e8e6e1]/90 backdrop-blur-md border-b border-stone-300/50">
                    <button onClick={onBack} className="text-[10px] md:text-xs uppercase tracking-widest font-sans font-bold hover:text-red-600 transition-colors flex items-center gap-2">
                        <span>←</span> <span className="hidden md:inline">Geri</span>
                    </button>
                    <div className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>NOIR.</div>
                    <div className="text-[10px] md:text-xs font-sans font-bold flex items-center gap-2 cursor-pointer hover:text-stone-600">
                        <span className="hidden md:inline">SEPET</span>
                        <span className="bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] transition-transform duration-300" key={cartCount}>
                            {cartCount}
                        </span>
                    </div>
                </nav>

                {/* Hero Video/Image */}
                <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden group bg-stone-300">
                    <img 
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                        className="w-full h-full object-cover parallax-img scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                        alt="Fashion Model"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-10 left-4 md:bottom-16 md:left-16 text-white mix-blend-difference max-w-[90%]">
                        <div className="flex items-center gap-4 mb-2 md:mb-4">
                            <div className="h-px w-8 md:w-12 bg-white"></div>
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans">Fall Winter 2025</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-thin italic leading-[0.9] md:leading-[0.8]">Silent <br/><span className="font-bold not-italic">Luxury</span></h1>
                    </div>
                </div>

                {/* Editorial Section */}
                <div className="px-4 md:px-24 py-16 md:py-24 bg-[#e8e6e1]">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                        <div className="flex-1 md:sticky md:top-32">
                            <h2 className="text-3xl md:text-6xl mb-6 md:mb-8 leading-tight">"Moda, sessizce konuşan bir dildir."</h2>
                            <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed max-w-md mb-8">
                                Gürültülü logolardan arınmış, sadece kumaşın dokusu ve kesimin ustalığıyla konuşan parçalar. Sürdürülebilir kaşmir ve İtalyan ipeği, minimalist tasarım anlayışıyla buluşuyor.
                            </p>
                            {/* Button Solid Black */}
                            <button onClick={() => document.getElementById('shop-grid')?.scrollIntoView({behavior:'smooth'})} className="w-full md:w-auto px-8 py-4 bg-black text-white text-xs font-sans font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-lg">
                                Hikayeyi Oku
                            </button>
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                             <div className="w-full aspect-[3/4] bg-stone-300">
                                {/* CHANGED: Replaced broken image with a confirmed high-availability image */}
                                <img src="https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion Detail 1" />
                             </div>
                             <div className="w-full aspect-[3/4] bg-stone-300 mt-0 md:mt-12">
                                <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion Detail 2" />
                             </div>
                        </div>
                    </div>
                </div>

                {/* Lookbook / Shop */}
                <div id="shop-grid" className="px-4 md:px-12 py-12 scroll-mt-24">
                     <h3 className="text-center font-sans text-xs font-bold uppercase tracking-[0.3em] mb-8 md:mb-12 text-stone-500">Koleksiyonu Keşfet</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
                        {[
                            { title: "Oversized Trench", price: "₺12,500", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop" },
                            { title: "Silk Evening Dress", price: "₺8,950", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop" },
                            { title: "Leather Chelsea Boots", price: "₺6,200", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop" },
                            { title: "Cashmere Sweater", price: "₺4,100", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop" },
                            { title: "Pleated Trousers", price: "₺3,800", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop" },
                            { title: "Signature Bag", price: "₺18,000", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop" },
                        ].map((item, i) => (
                            <div key={i} className="group cursor-pointer" onClick={handleAddToCart}>
                                <div className="relative overflow-hidden mb-4 md:mb-6 aspect-[3/4] bg-stone-300">
                                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.title}/>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <button className="absolute bottom-4 right-4 bg-white text-black text-[10px] font-sans font-bold uppercase px-6 py-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all md:translate-y-2 md:group-hover:translate-y-0 hover:bg-black hover:text-white shadow-lg">
                                        Sepete Ekle
                                    </button>
                                </div>
                                <div className="flex justify-between items-start font-sans">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider mb-1">{item.title}</h3>
                                        <span className="text-xs text-stone-500">New Season</span>
                                    </div>
                                    <span className="text-sm font-medium">{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-stone-900 text-[#e8e6e1] py-16 md:py-24 text-center font-sans mt-12 px-4">
                    <p className="text-stone-500 text-xs uppercase tracking-widest mb-4">Web Tasarım & Geliştirme</p>
                    <h2 className="text-2xl md:text-5xl font-bold mb-8">Markanızı podyuma taşıyın.</h2>
                    <button onClick={onLaunchWizard} className="w-full md:w-auto px-10 py-4 bg-[#e8e6e1] text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all">
                        Teklif Al
                    </button>
                </div>
            </div>
        );
    }

    // --------------------------------------------------------
    // ID 2: RETENTION - EMAIL SaaS (Interactive & Mobile Optimized)
    // --------------------------------------------------------
    if (projectId === 2) {
        return (
            <div className="fixed inset-0 z-[100] bg-[#050507] overflow-y-auto font-sans text-white animate-fade-in custom-scrollbar">
                <Toast />
                {/* Navbar */}
                <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050507]/90 backdrop-blur-xl px-4 md:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                         <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-purple-600"></div>
                         <span className="font-bold tracking-tight text-lg">Cycle.io</span>
                    </div>
                    <button onClick={onBack} className="text-xs text-gray-400 hover:text-white transition-colors">Projeden Çık ✕</button>
                </nav>

                {/* Hero Section */}
                <div className="relative pt-12 md:pt-20 pb-20 md:pb-32 px-4 md:px-0 text-center max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-medium mb-6 md:mb-8 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        Klaviyo & Shopify Entegrasyonu
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        E-Ticaret İçin <br/> Otopilot Gelir Sistemi.
                    </h1>
                    <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
                        Ziyaretçileri sadık müşterilere dönüştüren yapay zeka destekli email otomasyonları. Kodlama gerekmez.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button onClick={onLaunchWizard} className="px-8 py-4 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors w-full md:w-auto">
                            Ücretsiz Dene
                        </button>
                         <button onClick={onLaunchWizard} className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg font-bold text-sm hover:bg-white/15 transition-colors w-full md:w-auto flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Demo İzle
                        </button>
                    </div>
                </div>

                {/* Visual Feature: Flow Builder Simulation */}
                <div className="max-w-6xl mx-auto px-4 mb-32">
                    <div className="relative rounded-xl border border-white/10 bg-[#0c0c0e] shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] group cursor-default">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                        
                        {/* Mock UI: Flow Nodes - Centered & Scaled on Mobile */}
                        <div className="absolute top-1/2 left-1/2 md:left-1/4 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 transform transition-transform duration-700 md:group-hover:translate-x-4 scale-[0.65] md:scale-100 origin-center md:origin-left w-full md:w-auto flex flex-col items-center md:block">
                            <div className="bg-[#1c1c1f] p-4 rounded-lg border border-green-500/30 w-48 shadow-lg shadow-green-900/20 mb-0 md:mb-0">
                                <div className="text-[10px] text-green-400 font-bold uppercase mb-2">Tetikleyici</div>
                                <div className="text-sm font-bold">Sepet Terk Edildi</div>
                            </div>
                            <div className="h-8 w-px bg-white/10 mx-auto md:mx-0 md:ml-24"></div>
                            <div className="bg-[#1c1c1f] p-4 rounded-lg border border-blue-500/30 w-48 shadow-lg shadow-blue-900/20">
                                <div className="text-[10px] text-blue-400 font-bold uppercase mb-2">Aksiyon</div>
                                <div className="text-sm font-bold">Email Gönder #1</div>
                            </div>
                        </div>

                         {/* Stats Card Overlay - Adjusted for Mobile */}
                         <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 bg-black/80 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-xl md:w-64 hover:scale-105 transition-transform flex justify-between md:block items-center">
                             <div className="text-xs text-gray-400 mb-0 md:mb-1">Elde Edilen Gelir</div>
                             <div className="text-xl md:text-3xl font-bold text-green-400">₺142,390</div>
                         </div>
                    </div>
                </div>

                <div className="text-center pb-20">
                     <button onClick={onLaunchWizard} className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform w-full md:w-auto max-w-xs">
                         Benim İçin De Kur
                     </button>
                </div>
            </div>
        );
    }

    // --------------------------------------------------------
    // ID 3: DASHBOARD - SAAS (Mevcut EcommerceView)
    // --------------------------------------------------------
    if (projectId === 3) {
        return (
            <div className="fixed inset-0 z-[100] bg-black overflow-hidden animate-fade-in">
                <EcommerceView onBack={onBack} onLaunchWizard={onLaunchWizard} />
            </div>
        );
    }

    // --------------------------------------------------------
    // ID 4: MIMARHANE - ARCHITECTURE (Mobile Optimized)
    // --------------------------------------------------------
    if (projectId === 4) {
        return (
             <div className="fixed inset-0 z-[100] bg-white overflow-y-auto font-sans text-gray-900 animate-fade-in custom-scrollbar">
                
                {/* Floating Header */}
                <div className="fixed top-0 left-0 w-full p-4 md:p-10 flex justify-between items-start pointer-events-none z-50">
                    <div className="pointer-events-auto mix-blend-difference text-white cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                        <div className="text-2xl md:text-3xl font-bold tracking-tighter leading-none mb-1">MIMAR<br/>HANE</div>
                        <div className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-80">Architecture Studio</div>
                    </div>
                    <div className="flex gap-2 md:gap-4 pointer-events-auto">
                        {/* LINK TO CONSTRUCTION LOG (ID 5) - SOLID BUTTON */}
                        <button 
                            onClick={() => onSwitchProject && onSwitchProject(5)}
                            className="bg-black text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-xl"
                        >
                            Müşteri Girişi ↗
                        </button>
                        <button onClick={onBack} className="bg-black text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg text-sm">✕</button>
                    </div>
                </div>

                {/* Horizontal Scroll Container (Vertical on Mobile) */}
                <div className="flex flex-col md:flex-row h-auto md:h-screen w-full md:overflow-x-auto md:snap-x md:snap-mandatory scroll-smooth">
                    
                    {/* Intro Section */}
                    <div className="w-full md:w-[40vw] h-[90vh] md:h-screen shrink-0 flex flex-col justify-end p-6 md:p-12 md:snap-start border-b md:border-b-0 md:border-r border-gray-100 bg-white pt-32">
                         <div className="mb-12">
                             <div className="w-12 h-1 bg-black mb-8"></div>
                             <h2 className="text-4xl md:text-5xl lg:text-7xl font-light mb-6 tracking-tight">Form. <br/>Function. <br/>Future.</h2>
                             <p className="text-gray-500 max-w-sm leading-relaxed border-l-2 border-gray-100 pl-4 text-sm md:text-base">
                                 Doğal ışığı ve brütal materyalleri merkeze alan, sürdürülebilir ve zamansız yaşam alanları tasarlıyoruz.
                             </p>
                         </div>
                         <button onClick={onLaunchWizard} className="self-start px-8 py-4 bg-black text-white uppercase text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors">
                             Proje Başlat
                         </button>
                    </div>

                    {/* Project 1 */}
                    <div className="w-full md:w-[70vw] h-[50vh] md:h-screen shrink-0 relative md:snap-start group overflow-hidden bg-gray-200">
                        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                        <div className="absolute bottom-0 left-0 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent w-full">
                            <div className="text-white text-2xl md:text-3xl font-bold mb-1">Villa K</div>
                            <div className="text-white/60 text-xs uppercase tracking-widest">Bodrum, Turkey</div>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="w-full md:w-[70vw] h-[50vh] md:h-screen shrink-0 relative md:snap-start group overflow-hidden bg-gray-200">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                         <div className="absolute bottom-0 left-0 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent w-full">
                            <div className="text-white text-2xl md:text-3xl font-bold mb-1">Loft 42</div>
                            <div className="text-white/60 text-xs uppercase tracking-widest">İstanbul, Turkey</div>
                        </div>
                    </div>
                </div>
             </div>
        );
    }

    // --------------------------------------------------------
    // ID 5: CONSTRUCTION LOG (Interactive & Mobile Optimized)
    // --------------------------------------------------------
    if (projectId === 5) {
        return (
            <div className="fixed inset-0 z-[100] bg-[#f2f4f6] overflow-y-auto font-sans text-slate-800 animate-fade-in custom-scrollbar">
                <Toast />
                {/* SaaS Header */}
                <nav className="sticky top-0 left-0 w-full z-50 bg-white border-b border-slate-200 shadow-sm px-4 md:px-8 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 md:gap-4">
                        <button onClick={onBack} className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 text-sm font-medium">
                            <span className="text-lg">←</span> <span className="hidden md:inline">Çıkış</span>
                        </button>
                        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden md:block">Proje</span>
                            <span className="text-sm font-bold text-slate-900 truncate max-w-[150px] md:max-w-none">Villa Bonita</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold">Saha Aktif</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">MA</div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto p-4 md:p-8">
                    
                    {/* Top Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        {/* Progress */}
                        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm md:col-span-2 flex flex-col justify-between group hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Genel İlerleme</h3>
                                    <p className="text-lg md:text-2xl font-black text-slate-900">Kaba İnşaat Tamamlandı</p>
                                </div>
                                <span className="text-2xl md:text-3xl font-bold text-blue-600">%68</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 md:h-3 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full w-[68%] rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] md:text-xs text-slate-400 mt-2 font-medium">
                                <span>Başlangıç: 01 Mar</span>
                                <span>Tahmini Bitiş: 15 Eyl</span>
                            </div>
                        </div>

                        {/* Financial */}
                        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Bütçe Durumu</h3>
                            <div className="text-2xl font-bold text-slate-900 mb-1">₺2.4M</div>
                            <div className="text-xs text-slate-400 mb-4">Toplam onaylanan bütçe</div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[45%]"></div>
                                </div>
                                <span className="text-xs font-bold text-green-600">%45</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1">Harcanan: ₺1.1M</div>
                        </div>

                        {/* Weather Widget */}
                        <div className="bg-gradient-to-br from-sky-400 to-blue-500 p-4 md:p-5 rounded-xl shadow-sm text-white flex flex-col justify-between relative overflow-hidden h-[150px] md:h-auto">
                            <div className="relative z-10">
                                <h3 className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Şantiye Havası</h3>
                                <div className="text-3xl md:text-4xl font-bold">24°C</div>
                                <div className="text-sm font-medium opacity-90">Parçalı Bulutlu</div>
                            </div>
                            <div className="absolute top-[-10px] right-[-10px] text-7xl md:text-8xl opacity-20">☀️</div>
                            <div className="relative z-10 mt-2 flex gap-2 text-[10px] opacity-80">
                                <span className="bg-white/20 px-1.5 py-0.5 rounded">Rüzgar: 12km/s</span>
                                <span className="bg-white/20 px-1.5 py-0.5 rounded">Nem: %45</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT COLUMN: TIMELINE FEED */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg md:text-xl font-bold text-slate-900">Proje Akışı</h2>
                                <button onClick={handleDownload} className="text-sm text-blue-600 font-bold hover:underline">Rapor İndir</button>
                            </div>

                            <div className="relative border-l-2 border-slate-200 ml-3 space-y-12 pb-12">
                                
                                {/* Timeline Item 1 (TODAY) */}
                                <div className="relative pl-6 md:pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#f2f4f6]"></div>
                                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wide rounded mb-1">Bugün, 10:42</span>
                                                <h3 className="text-base md:text-lg font-bold text-slate-900">Çatı İzolasyon Kontrolü</h3>
                                            </div>
                                            <button className="text-slate-400 hover:text-slate-600" onClick={() => showToast("Detaylar e-posta ile gönderildi")}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                                            </button>
                                        </div>
                                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                                            A Blok çatı su yalıtım katmanları (membran) serimi tamamlandı. Yağmur testi için hazırlıklar yapılıyor. Saha şefi onay verdi.
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {/* Fixed broken image with a reliable construction site image */}
                                            <img src="https://images.unsplash.com/photo-1590486803833-1c5dc8ce84ac?q=80&w=400&auto=format&fit=crop" className="rounded-lg object-cover w-full h-24 border border-slate-100 hover:opacity-90 cursor-pointer transition-opacity" onClick={() => showToast("Görsel büyütme bu demoda aktif değil")} />
                                            <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=400&auto=format&fit=crop" className="rounded-lg object-cover w-full h-24 border border-slate-100 hover:opacity-90 cursor-pointer transition-opacity" onClick={() => showToast("Görsel büyütme bu demoda aktif değil")} />
                                            <div className="rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 text-xs h-24 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => showToast("+4 görsel daha var")}>
                                                <span className="font-bold text-lg">+4</span>
                                                Fotoğraf
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Item 2 */}
                                <div className="relative pl-6 md:pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-[#f2f4f6]"></div>
                                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-xs font-bold text-slate-400">Dün</span>
                                                <h3 className="text-base md:text-lg font-bold text-slate-900">Elektrik Tesisatı Altyapısı</h3>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm mb-4">
                                            2. Kat ana dağıtım panosu montajı yapıldı. Kablolama kanalları açıldı.
                                        </p>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors" onClick={handleDownload}>
                                            <div className="w-8 h-8 bg-red-100 text-red-500 rounded flex items-center justify-center font-bold text-xs">PDF</div>
                                            <div className="flex-1">
                                                <div className="text-xs font-bold text-slate-700 truncate">Elektrik_Plani_Rev2.pdf</div>
                                                <div className="text-[10px] text-slate-400">2.4 MB • Mimari Ofis</div>
                                            </div>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Item 3 */}
                                <div className="relative pl-6 md:pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-[#f2f4f6]"></div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 mb-1 block">12 Eylül 2024</span>
                                        <h3 className="text-sm md:text-base font-bold text-slate-700">Duvar Örme İşlemleri Başladı</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: WIDGETS */}
                        <div className="space-y-6">
                            
                            {/* Material List Widget */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                    Kritik Malzeme Takibi
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                        <span className="text-slate-600">Seramik (Vitra)</span>
                                        <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded text-xs font-bold">Kargoda</span>
                                    </li>
                                    <li className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                        <span className="text-slate-600">Parke (Meşe)</span>
                                        <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-xs font-bold">Depoda</span>
                                    </li>
                                    <li className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">Mutfak Ankastre</span>
                                        <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-bold">Bekliyor</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Team Widget */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-4">Proje Ekibi</h3>
                                <div className="flex -space-x-3 overflow-hidden mb-4">
                                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop" alt=""/>
                                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop" alt=""/>
                                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt=""/>
                                    <div className="h-10 w-10 rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-xs font-bold text-slate-500">+4</div>
                                </div>
                                <button onClick={handleMessage} className="w-full py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                    Ekibe Mesaj Gönder
                                </button>
                            </div>

                             {/* CTA for Agency */}
                             <div className="bg-slate-900 rounded-2xl p-6 text-center">
                                 <h3 className="text-white font-bold mb-2 text-sm">Bu Sistem Mimarlar İçin</h3>
                                 <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                                     Müşterilerinizi şantiye gezmekten kurtarın, profesyonelliğinizi dijitale taşıyın.
                                 </p>
                                 <button onClick={onLaunchWizard} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg text-xs transition-colors shadow-lg">
                                     Teklif Alın
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --------------------------------------------------------
    // ID 6: GUSTO - GASTRONOMY (Interactive & Mobile Optimized)
    // --------------------------------------------------------
    if (projectId === 6) {
         return (
             <div className="fixed inset-0 z-[100] bg-[#1a1a1a] overflow-y-auto font-serif text-white animate-fade-in custom-scrollbar">
                <Toast />
                <div className="absolute top-0 w-full z-50 p-4 md:p-6 flex justify-between items-center mix-blend-difference">
                     <button onClick={onBack} className="text-[10px] md:text-xs uppercase tracking-widest border-b border-transparent hover:border-white transition-all">Geri Dön</button>
                     <div className="text-xl md:text-2xl font-bold tracking-wider cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>GUSTO</div>
                     <button onClick={() => showToast("Rezervasyon modülü demo sürümünde aktif değil")} className="text-[10px] md:text-xs uppercase tracking-widest border border-white px-3 py-1.5 md:px-4 md:py-2 hover:bg-white hover:text-black transition-colors">Rezervasyon</button>
                </div>
                <div className="h-screen w-full relative flex items-center justify-center bg-[#1a1a1a]">
                    <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="relative z-10 text-center px-4">
                        <h1 className="text-5xl md:text-8xl italic font-thin mb-6 md:mb-8">Taste the Art.</h1>
                        <p className="max-w-md mx-auto text-sm md:text-base text-gray-300 leading-relaxed font-sans mb-8">
                            Modern gastronominin yerel lezzetlerle buluştuğu, duyulara hitap eden bir deneyim.
                        </p>
                        <button onClick={onLaunchWizard} className="px-6 py-3 md:px-8 md:py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
                             Benim İçin De Tasarla
                        </button>
                    </div>
                </div>
             </div>
        );
    }

    // Default Fallback
    return (
        <div className="fixed inset-0 z-[100] bg-[#eee] overflow-y-auto font-sans text-black animate-fade-in custom-scrollbar">
            <button onClick={onBack} className="fixed top-6 right-6 z-50 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl hover:scale-110 transition-transform">✕</button>
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Proje Detayları Yükleniyor...</h2>
                    <button onClick={onLaunchWizard} className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm">Projeyi Başlat</button>
                </div>
            </div>
         </div>
    );
};

export default ProjectShowcase;
