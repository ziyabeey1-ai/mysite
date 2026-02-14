import React from 'react';

interface ServicesProps {
    onLaunchWizard?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onLaunchWizard }) => {
  return (
    // UPDATED: Removed sticky/md:sticky to fix visibility issues.
    // Now it's a standard relative section that flows naturally.
    <section id="services" className="min-h-screen bg-[#000] flex flex-col justify-center py-24 md:py-32 px-6 border-t border-white/5 z-20 shadow-2xl relative">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-4xl md:text-7xl font-semibold text-white tracking-tighter mb-6">
            Sistem. Strateji. <br /><span className="text-gray-500">Sanat.</span>
          </h2>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
            
            {/* LARGE BOX - Web Development */}
            <div className="md:col-span-2 bg-[#161617] rounded-3xl p-8 md:p-14 relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-300 tilt-card hover:shadow-2xl hover:shadow-blue-900/10">
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/20">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Web Geliştirme</h3>
                    <p className="text-gray-400 text-base md:text-lg max-w-md">
                        Apple standartlarında UI/UX prensipleri ile sıfırdan kodlanmış, performans odaklı dijital yapılar. Hazır şablon yok, sadece özgün kod.
                    </p>
                 </div>
                 {/* Decorative background element */}
                 <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            </div>

            {/* TALL BOX - Email Marketing */}
            <div className="md:row-span-2 bg-[#161617] rounded-3xl p-8 md:p-10 relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-300 tilt-card hover:shadow-2xl hover:shadow-orange-900/10 flex flex-col justify-between">
                <div>
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-900/20">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Email Pazarlama</h3>
                    <p className="text-gray-400 text-base md:text-lg">
                        Müşterinin kalbine giden en kısa yol. %40+ açılma oranları sağlayan, segmentasyon destekli stratejiler.
                    </p>
                </div>
                <div className="mt-8 bg-black/40 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>Açılma Oranı</span>
                        <span className="text-green-500 font-bold">%42.8</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 w-[42%] h-full"></div>
                    </div>
                </div>
            </div>

            {/* SMALL BOX - UX Design */}
            <div className="bg-[#1c1c1f] rounded-3xl p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-300 tilt-card hover:shadow-2xl group">
                 <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-900/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Arayüz Tasarımı</h3>
                 <p className="text-gray-400">Minimalist ve işlevsel.</p>
            </div>

            {/* RESTORED: Data Analytics Card (Replaces the temporary Wizard Card) */}
            <div className="bg-[#1c1c1f] rounded-3xl p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-300 tilt-card hover:shadow-2xl group">
                 <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-900/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Veri Analitiği</h3>
                 <p className="text-gray-400">Kullanıcı davranışları ve metrik takibi.</p>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Services;