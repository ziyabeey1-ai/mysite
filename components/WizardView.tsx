import React, { useState } from 'react';

interface WizardViewProps {
  onBack: () => void;
  prefilledData?: { 
      oneTimePrice: number; 
      hostingMonthly: number; // Base hosting cost (Always Annual)
      serviceMonthly: number; // Base service cost (Subject to Cycle Markup)
      marketingBudget: number;
      summary: string; 
  } | null;
}

// Helper to expand service details
const getServiceDetails = (key: string): string => {
    if (key.includes('Ölçek')) return "Next.js 14 altyapısı, SSR/CSR hibrit mimari, Global CDN dağıtımı.";
    if (key.includes('Altyapı')) return "Hostinger Enterprise / Google Cloud Premium Partner garantisi ile %99.9 Uptime.";
    if (key.includes('Yönetim')) return "İçerik girişleri, görsel optimizasyonları ve CMS entegrasyonu.";
    if (key.includes('Tasarım')) return "Figma prototipleme, mobil öncelikli responsive kodlama, marka renk paleti uyumu.";
    if (key.includes('Fonksiyon')) return "Güvenlik sertifikaları (SSL), veritabanı kurulumu ve API bağlantıları.";
    if (key.includes('Pazarlama')) return "Aylık performans raporlaması, ROI takibi ve kitle optimizasyonu.";
    if (key.includes('Sosyal')) return "İçerik takvimi oluşturma, video kurgu ve topluluk yönetimi.";
    return "Profesyonel dijital hizmet standardı.";
};

const WizardView: React.FC<WizardViewProps> = ({ onBack, prefilledData }) => {
  // Interactive Brand Name for Preview
  const [brandName, setBrandName] = useState('');
  
  // Billing Cycle for SERVICES (12, 6, 3 months)
  const [cycle, setCycle] = useState<number>(12);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    note: ''
  });

  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // --- DISCOUNT LOGIC ---
  const discountRate = 0.10;
  const discountCode = "YZT-START-10";
  
  // --- CALCULATIONS ---
  const rawOneTime = prefilledData ? prefilledData.oneTimePrice : 0;
  const baseHostingMonthly = prefilledData ? prefilledData.hostingMonthly : 0;
  const baseServiceMonthly = prefilledData ? prefilledData.serviceMonthly : 0;
  const mediaBudget = prefilledData ? prefilledData.marketingBudget : 0;

  // 1. One Time Cost (Discounted)
  const discountAmount = rawOneTime * discountRate;
  const finalOneTime = rawOneTime - discountAmount;

  // 2. Hosting Cost (ALWAYS ANNUAL)
  const hostingTotal = baseHostingMonthly * 12;

  // 3. Service Cost (Subject to Cycle)
  // Markup Logic: 12m = Base, 6m = +20%, 3m = +35%
  let serviceMarkup = 1;
  if (cycle === 6) serviceMarkup = 1.2;
  if (cycle === 3) serviceMarkup = 1.35;

  const finalServiceMonthly = baseServiceMonthly * serviceMarkup;
  const serviceTotal = finalServiceMonthly * cycle; // Total to pay upfront for the cycle

  // Grand Total
  const totalCashInvestment = finalOneTime + hostingTotal + serviceTotal;

  const sendEmail = () => {
    let body = '';
    const finalBrand = brandName || "Belirtilmemiş";
    
    if (prefilledData) {
        body = `Merhaba Yusuf Bey,\n\nMarka Adı: ${finalBrand}\n\nWeb sitenizdeki proje planlayıcı üzerinden aşağıdaki konfigürasyonu oluşturdum:\n\n${prefilledData.summary}\n\n-- YATIRIM ÖZETİ --\nProje Kurulum Bedeli: ${rawOneTime.toLocaleString()} TL\nİndirim Tutarı (%10 - ${discountCode}): -${discountAmount.toLocaleString()} TL\n\nAltyapı ve Hosting (Yıllık): ${hostingTotal.toLocaleString()} TL\n\nHizmet Sözleşmesi (${cycle} Ay): ${serviceTotal.toLocaleString()} TL\n(Aylık Ortalama: ${Math.round(finalServiceMonthly).toLocaleString()} TL)\n\nTOPLAM NAKİT YATIRIM: ${totalCashInvestment.toLocaleString()} TL\n\nTahmini Medya Bütçesi (Google/Meta'ya): ${mediaBudget.toLocaleString()} TL/Ay\n\n-- MÜŞTERİ BİLGİLERİ --\nAd Soyad: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\n\nProje Notu:\n${formData.note}`;
    } else {
        body = `Merhaba Yusuf Bey... (Standart Sihirbaz)`; 
    }

    const subject = `Yeni Proje Talebi: ${finalBrand} [${cycle} Ay - ${discountCode}]`;
    window.location.href = `mailto:yz.terzioglu@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // PARSE SUMMARY STRING
  const parsedSummaryItems = prefilledData 
    ? prefilledData.summary
        .split('\n')
        .filter(line => line.trim().startsWith('•'))
        .map(line => {
            const cleanLine = line.replace('•', '').trim();
            const [key, val] = cleanLine.split(':');
            return { key: key.trim(), value: val?.trim() || '' };
        })
    : [];

  const isCloudSelected = prefilledData?.summary.includes('Google Cloud');
  const isHostingerSelected = prefilledData?.summary.includes('Hostinger');

  // ----------------------------------------------------------------
  // RENDER: PROPOSAL DASHBOARD
  // ----------------------------------------------------------------
  if (prefilledData) {
      return (
        <div className="fixed inset-0 z-50 bg-[#F5F5F7] text-[#1d1d1f] font-sans overflow-hidden flex flex-col">
            
            {/* Top Bar (Sticky) */}
            <div className="shrink-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 flex items-center justify-between px-4 md:px-12">
                <div className="flex items-center gap-4">
                     <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                     <span className="font-semibold text-gray-900 tracking-tight text-sm md:text-base">Teklif Masası</span>
                </div>
                {/* Discount Badge */}
                <div className="flex items-center gap-2 bg-green-100 px-2 md:px-3 py-1 rounded-full border border-green-200">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    <span className="text-[10px] md:text-xs font-bold text-green-700 tracking-wide">İNDİRİM AKTİF</span>
                </div>
            </div>

            {/* Main Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
                
                {/* --- LEFT COLUMN (Mobile: Top) - INPUT & PREVIEW --- */}
                <div className="w-full md:w-[55%] bg-gray-100 flex flex-col p-4 md:p-12 shrink-0">
                     
                     {/* 1. BRAND INPUT (Now prominent on Mobile Top) */}
                     <div className="mb-6 md:mb-10 w-full max-w-2xl mx-auto">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center md:text-left">
                            Önce Markanızı Oluşturalım
                        </label>
                        <input 
                            type="text" 
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            placeholder="Marka Adını Yazın..."
                            className="w-full text-center md:text-left text-3xl md:text-5xl font-black border-b-2 border-gray-300 py-2 focus:outline-none focus:border-black bg-transparent placeholder-gray-300 transition-colors"
                            autoFocus
                        />
                     </div>

                     {/* 2. LIVE PREVIEW CARD */}
                     <div className="relative w-full max-w-2xl mx-auto aspect-[16/10] bg-white rounded-xl shadow-xl border border-gray-300 flex flex-col overflow-hidden mb-6 md:mb-0">
                        <div className="h-6 md:h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                             <div className="flex gap-1.5">
                                 <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400"></div>
                                 <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400"></div>
                             </div>
                             <div className="flex-1 text-center text-[9px] md:text-[10px] text-gray-400 flex items-center justify-center gap-2">
                                 <span>{brandName ? `${brandName.toLowerCase()}.com` : 'markaniz.com'}</span>
                                 <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                             </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center relative bg-white">
                             {/* Partner Badges on Preview */}
                             <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col items-end gap-1">
                                {isCloudSelected && (
                                    <span className="px-1.5 py-0.5 bg-gray-50 rounded border border-gray-100 text-[8px] md:text-[9px] font-bold text-gray-600 flex items-center gap-1 shadow-sm">
                                        Powered by Google Cloud
                                    </span>
                                )}
                                {isHostingerSelected && (
                                    <span className="px-1.5 py-0.5 bg-purple-50 rounded border border-purple-100 text-[8px] md:text-[9px] font-bold text-purple-600 flex items-center gap-1 shadow-sm">
                                        Hostinger Enterprise
                                    </span>
                                )}
                             </div>

                             <div className="text-center px-4">
                                 <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 break-words">{brandName || "MARKA"}</h1>
                                 <p className="text-xs md:text-sm text-gray-400">Geleceğe Hoşgeldiniz</p>
                             </div>
                        </div>
                     </div>

                     <div className="mt-4 text-center md:text-left text-xs text-gray-400 max-w-2xl mx-auto">
                        ☝️ Marka adınızı yukarıya yazdığınızda, websitenizin önizlemesi anında güncellenir.
                     </div>
                </div>

                {/* --- RIGHT COLUMN (Mobile: Bottom) - FORM & DETAILS --- */}
                <div className="w-full md:w-[45%] bg-white border-l border-gray-200 relative flex flex-col pb-32">
                    
                    <div className="p-6 md:p-12">
                        
                        {/* Service Breakdown (Accordion style) */}
                        <div className="mb-8 space-y-3">
                            <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Seçilen Hizmetler</h3>
                            {parsedSummaryItems.map((item, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-2">
                                    <div 
                                        className="flex justify-between items-center cursor-pointer py-1"
                                        onClick={() => setExpandedItem(expandedItem === idx ? null : idx)}
                                    >
                                        <div>
                                            <span className="text-[10px] text-gray-400 block uppercase">{item.key}</span>
                                            <span className="font-semibold text-gray-900 text-sm">{item.value}</span>
                                        </div>
                                        <span className="text-gray-300 text-xs">{expandedItem === idx ? '-' : '+'}</span>
                                    </div>
                                    {expandedItem === idx && (
                                        <div className="text-xs text-gray-500 mt-1 bg-gray-50 p-2 rounded">
                                            {getServiceDetails(item.key)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* BILLING CYCLE SELECTOR (Moved here per request) */}
                        {baseServiceMonthly > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-3">Hizmet Sözleşmesi & Süre</h3>
                                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                                    {[3, 6, 12].map((c) => (
                                        <button 
                                            key={c}
                                            onClick={() => setCycle(c)}
                                            className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1
                                                ${cycle === c ? 'bg-white shadow-sm text-black border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            <span>{c} Aylık</span>
                                            {c === 12 && <span className="text-[9px] text-green-600 bg-green-50 px-1.5 rounded">%0 Vade</span>}
                                            {c === 6 && <span className="text-[9px] text-orange-500">+%20 Fark</span>}
                                            {c === 3 && <span className="text-[9px] text-red-500">+%35 Fark</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Financial Breakdown Card */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Yatırım Özeti</h3>
                            </div>
                            
                            {/* 1. SETUP FEE */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">Proje Bedeli (Kurulum)</span>
                                <div className="text-right">
                                    <span className="block text-xs text-red-400 line-through">{rawOneTime.toLocaleString()} ₺</span>
                                    <span className="block font-bold text-gray-900">{finalOneTime.toLocaleString()} ₺</span>
                                </div>
                            </div>

                            {/* Discount Code */}
                            <div className="flex justify-between items-center bg-green-50 p-2 rounded border border-green-100">
                                <span className="text-green-700 text-xs font-medium">Hoşgeldin İndirimi (%10)</span>
                                <span className="font-mono text-green-700 font-bold text-xs">{discountCode}</span>
                            </div>

                            {/* 2. HOSTING (Separate Line Item - Always Annual) */}
                            {hostingTotal > 0 && (
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-gray-600 text-sm">Altyapı & Hosting</span>
                                        <span className="text-[10px] text-gray-400">{baseHostingMonthly.toLocaleString()}₺ x 12 Ay (Sabit Yıllık)</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{hostingTotal.toLocaleString()} ₺</span>
                                </div>
                            )}

                            {/* 3. SERVICE FEE (Variable Cycle) */}
                            {baseServiceMonthly > 0 && (
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-gray-600 text-sm">Hizmet Bedeli ({cycle} Ay)</span>
                                        <span className="text-[10px] text-gray-400">
                                            {Math.round(finalServiceMonthly).toLocaleString()}₺ x {cycle} Ay (Peşin)
                                        </span>
                                    </div>
                                    <span className="font-bold text-blue-600">{serviceTotal.toLocaleString()} ₺</span>
                                </div>
                            )}

                            {/* Ad Budget (Distinct) */}
                            {mediaBudget > 0 && (
                                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 mt-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="text-blue-900 font-bold text-xs">Medya Reklam Bütçesi</span>
                                            <span className="text-[9px] text-blue-400">Doğrudan Google/Meta'ya ödenir (Aylık)</span>
                                        </div>
                                        <span className="font-mono font-bold text-blue-700 text-sm">{mediaBudget.toLocaleString()} ₺</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Form Fields */}
                        <div className="space-y-4">
                             <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-2">İletişim Bilgileri</h3>
                             <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Ad Soyad" className="w-full p-3 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:bg-white focus:border-black outline-none transition-colors" />
                             <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email Adresi" className="w-full p-3 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:bg-white focus:border-black outline-none transition-colors" />
                             <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Telefon No" className="w-full p-3 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:bg-white focus:border-black outline-none transition-colors" />
                             <textarea rows={2} value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} placeholder="Proje hakkında ek notlar..." className="w-full p-3 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:bg-white focus:border-black outline-none transition-colors resize-none" />
                        </div>

                    </div>
                </div>
            </div>

            {/* Fixed Bottom Action Bar */}
            <div className="shrink-0 w-full bg-white border-t border-gray-200 p-4 md:p-6 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50">
                 <div>
                     <div className="text-[10px] text-gray-400 uppercase">Toplam Nakit Yatırım</div>
                     <div className="text-xl md:text-2xl font-bold text-black">{totalCashInvestment.toLocaleString()}₺</div>
                 </div>
                 <button 
                    onClick={sendEmail} 
                    disabled={!formData.name || !formData.email} 
                    className="px-6 py-3 md:px-8 md:py-3 bg-black text-white rounded-full font-bold text-sm md:text-base hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg"
                 >
                    Teklifi Al
                 </button>
            </div>

        </div>
      );
  }

  return <div>Standard Wizard Flow...</div>;
};

export default WizardView;