import React, { useState, useEffect } from 'react';

interface ProjectPlannerProps {
  onComplete: (data: { oneTimePrice: number, hostingMonthly: number, serviceMonthly: number, marketingBudget: number, summary: string }) => void;
}

// --- DATA STRUCTURES ---

type StepId = 'scale' | 'infra' | 'management' | 'function' | 'design' | 'marketing' | 'social' | 'addons';

interface Option {
  id: string;
  label: string;
  subLabel?: string;
  price: number;        // One-time cost
  monthlyPrice?: number; // Recurring cost (Base)
  trigger?: string;     // Visual trigger
  isRecommended?: boolean; // Dynamic recommendation flag
  giftLabel?: string;   // New field for dynamic gifts
}

interface Step {
  id: StepId;
  title: string;
  desc: string;
  type: 'single' | 'multi';
  options: Option[];
}

// Initial Data Layout
const RAW_STEPS: Step[] = [
  {
    id: 'scale',
    title: 'Proje Ölçeği',
    desc: 'Dijital yapının temel mimarisi ne kadar geniş olacak?',
    type: 'single',
    options: [
      { id: 'landing', label: 'Tek Sayfa (Landing)', subLabel: 'Yüksek dönüşüm odaklı tanıtım.', price: 15000, trigger: 'layout_single' },
      { id: 'corporate', label: 'Kurumsal Web', subLabel: '5-10 sayfa, hizmet ve blog yapısı.', price: 35000, trigger: 'layout_multi' },
      { id: 'ecommerce', label: 'E-Ticaret', subLabel: 'Ürün, sepet ve ödeme altyapısı.', price: 65000, trigger: 'layout_shop' },
      { id: 'saas', label: 'Web Uygulaması / SaaS', subLabel: 'Kullanıcı girişi, dashboard, veri işleme.', price: 90000, trigger: 'layout_dashboard' }
    ]
  },
  {
    id: 'infra',
    title: 'Altyapı & Güç (Hosting)',
    desc: 'Performans ve sunucu maliyetleri.',
    type: 'single',
    options: [
      { id: 'hostinger_pro', label: 'Hostinger Cloud', subLabel: 'Başlangıç ve orta ölçek için ideal.', price: 0, monthlyPrice: 350, trigger: 'infra_hostinger' }, // Base: 350
      { id: 'google_cloud', label: 'Google Cloud Platform', subLabel: 'Otomatik ölçeklenen Kubernetes mimari.', price: 15000, monthlyPrice: 800, trigger: 'infra_google' }, // Base: 800
      { id: 'dedicated', label: 'Özel Sunucu (Dedicated)', subLabel: 'Size özel fiziksel kaynaklar.', price: 25000, monthlyPrice: 1500, trigger: 'infra_server' } // Base: 1500
    ]
  },
  {
    id: 'management',
    title: 'İçerik Yönetimi',
    desc: 'Sitenizi ne sıklıkla ve nasıl güncelleyeceksiniz?',
    type: 'single',
    options: [
      { id: 'static', label: 'Statik Kod', subLabel: 'Sadece geliştirici günceller (Maksimum Hız).', price: 0, trigger: 'cms_none' },
      { id: 'headless', label: 'Headless CMS', subLabel: 'Modern yönetim paneli (Sanity/Strapi).', price: 15000, trigger: 'cms_headless' },
      { id: 'custom', label: 'Özel Yönetim Paneli', subLabel: 'Size özel yazılmış admin paneli.', price: 40000, trigger: 'cms_custom' }
    ]
  },
  {
    id: 'function',
    title: 'Fonksiyonel Modüller',
    desc: 'Sisteme hangi yetenekleri kazandıralım?',
    type: 'multi',
    options: [
      { id: 'auth', label: 'Üyelik Sistemi', subLabel: 'Giriş/Kayıt ve Profil yönetimi.', price: 12000, trigger: 'feat_auth' },
      { id: 'payment', label: 'Ödeme Altyapısı', subLabel: 'Iyzico/Stripe entegrasyonu.', price: 8000, trigger: 'feat_pay' },
      { id: 'search', label: 'Gelişmiş Arama', subLabel: 'ElasticSearch / Algolia.', price: 6000, trigger: 'feat_search' },
      { id: 'booking', label: 'Rezervasyon / Takvim', subLabel: 'Randevu alma modülü.', price: 10000, trigger: 'feat_calendar' }
    ]
  },
  {
    id: 'design',
    title: 'Tasarım Dili',
    desc: 'Kullanıcı arayüzü (UI) hangi seviyede olmalı?',
    type: 'single',
    options: [
      { id: 'clean', label: 'Temiz & Kurumsal', subLabel: 'Standart, güven veren, beyaz ağırlıklı.', price: 5000, trigger: 'style_clean' },
      { id: 'dark', label: 'Dark & Modern', subLabel: 'Karanlık mod, neon detaylar, SaaS havası.', price: 8000, trigger: 'style_dark' },
      { id: 'luxury', label: 'High-End & Animasyonlu', subLabel: 'WebGL, scrollytelling, mikro-interaksiyonlar.', price: 25000, trigger: 'style_luxury' }
    ]
  },
  {
    id: 'marketing',
    title: 'Dijital Pazarlama',
    desc: 'Büyüme stratejileri (Aylık Hizmet).',
    type: 'multi',
    options: [
      { id: 'google_ads', label: 'Google Ads Yönetimi', subLabel: 'Arama ağı ve görüntülü reklamlar.', price: 0, monthlyPrice: 15000, trigger: 'mark_google' },
      { id: 'meta_ads', label: 'Meta (FB/Insta) Ads', subLabel: 'Hedefli sosyal medya reklamları.', price: 0, monthlyPrice: 12500, trigger: 'mark_meta' },
      { id: 'email_mkt', label: 'Email Pazarlama', subLabel: 'Klaviyo otomasyonları ve bültenler.', price: 5000, monthlyPrice: 8000, trigger: 'mark_email' },
      { id: 'influencer', label: 'Influencer Marketing', subLabel: 'Mikro/Makro influencer iş birlikleri.', price: 10000, monthlyPrice: 25000, trigger: 'mark_influencer' }
    ]
  },
  {
    id: 'social',
    title: 'Sosyal Medya',
    desc: 'Hangi platformlarda aktif olacağız? (Aylık Hizmet).',
    type: 'multi',
    options: [
      { id: 'instagram', label: 'Instagram / Reels', subLabel: '12 Post + 4 Reels / Ay.', price: 0, monthlyPrice: 20000, trigger: 'soc_insta' },
      { id: 'linkedin', label: 'LinkedIn (B2B)', subLabel: 'Kurumsal itibar yönetimi.', price: 0, monthlyPrice: 15000, trigger: 'soc_linkedin' },
      { id: 'tiktok', label: 'TikTok / YouTube Shorts', subLabel: 'Viral video içerik üretimi.', price: 0, monthlyPrice: 25000, trigger: 'soc_tiktok' },
      { id: 'youtube', label: 'YouTube Kanalı', subLabel: 'Video prodüksiyon ve SEO.', price: 15000, monthlyPrice: 35000, trigger: 'soc_youtube' }
    ]
  },
  {
    id: 'addons',
    title: 'Güçlendiriciler',
    desc: 'Teknik performans ve analiz eklentileri.',
    type: 'multi',
    options: [
      { id: 'seo_pro', label: 'SEO Pro Paketi', subLabel: 'Teknik SEO, Schema, Sitemap.', price: 7500, trigger: 'addon_seo' },
      { id: 'ai', label: 'Yapay Zeka Entegrasyonu', subLabel: 'OpenAI/Gemini destekli içerik veya bot.', price: 20000, trigger: 'addon_ai' },
      { id: 'analytics', label: 'İleri Analitik', subLabel: 'Google TM, Hotjar, Event takibi.', price: 5000, trigger: 'addon_data' }
    ]
  }
];

const ProjectPlanner: React.FC<ProjectPlannerProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // State for logic-enhanced steps
  const [steps, setSteps] = useState<Step[]>(RAW_STEPS);

  const [selections, setSelections] = useState<{
    scale: string;
    infra: string;
    management: string;
    function: string[];
    design: string;
    marketing: string[];
    social: string[];
    addons: string[];
  }>({
    scale: 'landing',
    infra: 'hostinger_pro',
    management: 'static',
    function: [],
    design: 'clean',
    marketing: [],
    social: [],
    addons: []
  });

  // Marketing Budget
  const [adBudget, setAdBudget] = useState(50000); 

  // Separated Pricing State
  const [prices, setPrices] = useState({ 
      oneTime: 0, 
      hostingMonthly: 0, 
      serviceMonthly: 0 
  });

  // --- SMART LOGIC: Dynamic Pricing & Recommendations ---
  useEffect(() => {
    const updatedSteps = [...RAW_STEPS];
    const infraStep = updatedSteps.find(s => s.id === 'infra');
    
    // Calculate Scaling Factor based on Project Type
    let hostingMultiplier = 1;
    let scalingLabel = "";
    
    // Gift logic applies based on scale
    let gift = ""; 

    if (selections.scale === 'landing') {
        hostingMultiplier = 1.0; // Base Price
        scalingLabel = " (Tek Sayfa)";
        gift = "";
    } else if (selections.scale === 'corporate') {
        hostingMultiplier = 2.0; 
        scalingLabel = " (Kurumsal Pro)";
        gift = "🎁 Domain + 5 Email Hediye";
    } else {
        hostingMultiplier = 4.0;
        scalingLabel = " (Yüksek Performans)";
        gift = "🎁 Domain + 5 Email Hediye";
    }

    // Apply multiplier to infrastructure prices dynamically
    if (infraStep) {
        infraStep.options = infraStep.options.map(opt => {
            const isRec = (selections.scale === 'ecommerce' || selections.scale === 'saas') 
                          ? opt.id === 'google_cloud' 
                          : opt.id === 'hostinger_pro';

            return {
                ...opt,
                isRecommended: isRec,
                subLabel: opt.subLabel?.split(' - ')[0] + (opt.id === 'hostinger_pro' ? scalingLabel : ''),
                giftLabel: gift,
                monthlyPrice: opt.monthlyPrice ? Math.round(opt.monthlyPrice * hostingMultiplier) : 0
            };
        });
    }

    setSteps(updatedSteps);

  }, [selections.scale]);

  // --- LOGIC: Calculate Price ---
  useEffect(() => {
    let oneTime = 0;
    let hMonthly = 0; // Hosting/Infra monthly
    let sMonthly = 0; // Services monthly
    
    // Helper to find option in CURRENT (updated) steps
    const findOpt = (stepId: number, optId: string) => steps[stepId]?.options.find(o => o.id === optId);

    const addCost = (stepId: number, opt: Option | undefined) => {
        if (!opt) return;
        oneTime += opt.price;
        
        if (opt.monthlyPrice) {
            // Is this hosting or service?
            if (steps[stepId].id === 'infra') {
                hMonthly += opt.monthlyPrice;
            } else {
                sMonthly += opt.monthlyPrice;
            }
        }
    };

    // Single selections
    addCost(0, findOpt(0, selections.scale));
    addCost(1, findOpt(1, selections.infra));
    addCost(2, findOpt(2, selections.management));
    addCost(4, findOpt(4, selections.design));

    // Multi selections
    selections.function.forEach(id => addCost(3, findOpt(3, id)));
    selections.marketing.forEach(id => addCost(5, findOpt(5, id)));
    selections.social.forEach(id => addCost(6, findOpt(6, id)));
    selections.addons.forEach(id => addCost(7, findOpt(7, id)));

    setPrices({ oneTime, hostingMonthly: hMonthly, serviceMonthly: sMonthly });
  }, [selections, steps]);

  const handleSelection = (stepId: StepId, optionId: string, type: 'single' | 'multi') => {
    if (type === 'single') {
      setSelections(prev => ({ ...prev, [stepId]: optionId }));
    } else {
      setSelections(prev => {
        // @ts-ignore
        const currentList = prev[stepId] as string[];
        if (currentList.includes(optionId)) {
          return { ...prev, [stepId]: currentList.filter(i => i !== optionId) };
        } else {
          return { ...prev, [stepId]: [...currentList, optionId] };
        }
      });
    }
  };

  const handleFinish = () => {
    const getLabel = (stepIdx: number, id: string) => steps[stepIdx].options.find(o => o.id === id)?.label;
    const getLabels = (stepIdx: number, ids: string[]) => ids.map(id => steps[stepIdx].options.find(o => o.id === id)?.label).join(', ');
    
    const infraOption = steps[1].options.find(o => o.id === selections.infra);
    const giftNote = infraOption?.giftLabel ? `(${infraOption.giftLabel})` : '';

    const summary = `
    **PROJE MİMARİSİ**
    ------------------
    • Ölçek: ${getLabel(0, selections.scale)}
    • Altyapı: ${getLabel(1, selections.infra)} ${giftNote}
    • Yönetim: ${getLabel(2, selections.management)}
    • Tasarım: ${getLabel(4, selections.design)}
    • Modüller: ${getLabels(3, selections.function) || 'Yok'}
    
    **PAZARLAMA & BÜYÜME**
    ------------------------------
    • Kanallar: ${getLabels(5, selections.marketing) || 'Yok'}
    • Sosyal Medya: ${getLabels(6, selections.social) || 'Yok'}
    • Reklam Bütçesi (Medya): ${adBudget.toLocaleString()} TL/Ay (Hariç)
    
    **TEKNİK EKSTRALAR**
    --------------------
    • Eklentiler: ${getLabels(7, selections.addons) || 'Yok'}
    `.trim();

    onComplete({ 
        oneTimePrice: prices.oneTime, 
        hostingMonthly: prices.hostingMonthly,
        serviceMonthly: prices.serviceMonthly,
        marketingBudget: selections.marketing.length > 0 ? adBudget : 0,
        summary 
    });
  };

  // --- VISUALIZER ---
  const Visualizer = () => {
    const isDark = selections.design === 'dark' || selections.design === 'luxury';
    const isMarketing = selections.marketing.length > 0;
    const isGoogleCloud = selections.infra === 'google_cloud';
    const isHostinger = selections.infra === 'hostinger_pro';
    
    // Base Colors
    const bg = isDark ? 'bg-[#0F0F11]' : 'bg-white';
    const border = isDark ? 'border-gray-800' : 'border-gray-200';
    
    return (
      <div className={`w-full h-full ${bg} rounded-xl md:rounded-2xl shadow-2xl border ${border} relative overflow-hidden transition-all duration-700 flex flex-col`}>
        
        {/* Header */}
        <div className={`h-8 border-b ${border} flex items-center px-4 gap-2 shrink-0 bg-gray-50/50`}>
          <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div><div className="w-2.5 h-2.5 rounded-full bg-green-400"></div></div>
          {/* Dynamic Address Bar Badge */}
          <div className="ml-auto flex items-center gap-2">
              {isGoogleCloud && (
                  <span className="text-[9px] font-bold text-gray-500 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Google Cloud
                  </span>
              )}
              {isHostinger && (
                   <span className="text-[9px] font-bold text-purple-700 flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Hostinger
                   </span>
              )}
          </div>
        </div>

        <div className="flex-1 relative p-4 md:p-6 flex flex-col items-center justify-center overflow-hidden">
             
             {/* If Marketing is selected, show Dashboard Overlay */}
             {isMarketing ? (
                 <div className="absolute inset-x-4 top-4 h-32 md:h-40 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-xl border border-white/10 p-4 shadow-xl z-20 animate-slide-up overflow-hidden">
                     {/* Data Visualization Decor */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[40px] rounded-full"></div>
                     <div className="relative z-10">
                        <div className="text-[10px] text-blue-200 uppercase tracking-widest mb-1">Medya Harcaması</div>
                        <div className="text-2xl font-bold text-white mb-2">{adBudget.toLocaleString()}₺</div>
                        <div className="flex items-end gap-1 h-8 w-full mt-4">
                            {[40, 60, 35, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                                <div key={i} style={{height: `${h}%`}} className="flex-1 bg-blue-400/50 rounded-t-sm"></div>
                            ))}
                        </div>
                     </div>
                 </div>
             ) : (
                // Regular UI Mockup
                <div className="w-full h-32 md:h-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center opacity-30">
                    <span className="text-xs">Arayüz Önizleme</span>
                </div>
             )}
             
             {/* Cloud Infrastructure Animation */}
             {(isGoogleCloud || selections.infra === 'dedicated') && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                     <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                     <div className="absolute bottom-[30%] right-[15%] w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                 </div>
             )}
             
        </div>
      </div>
    );
  };

  const activeStepData = steps[currentStepIndex];
  const isMarketingStep = activeStepData.id === 'marketing';

  return (
    <section className="relative bg-[#000] z-30">
      <div className="h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full bg-[#F5F5F7] text-[#1d1d1f] flex flex-col md:flex-row overflow-hidden">
          
          {/* LEFT: VISUALIZER (Desktop) / TOP (Mobile) */}
          <div className="w-full md:w-1/2 h-[35vh] md:h-full bg-gray-100 flex items-center justify-center p-4 md:p-12 relative shrink-0">
             <div className="relative z-10 w-full max-w-[400px] h-full max-h-[550px] flex flex-col shadow-2xl rounded-2xl bg-white p-2">
                <Visualizer />
                
                <div className="mt-4 px-2">
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 text-center">Yatırım Özeti</div>
                    
                    <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{prices.oneTime.toLocaleString()}₺</div>
                            <div className="text-[9px] text-gray-400 uppercase">Kurulum</div>
                        </div>
                        <div className="text-center border-l border-gray-100">
                            <div className="text-lg font-bold text-blue-600">{prices.hostingMonthly.toLocaleString()}₺</div>
                            <div className="text-[9px] text-blue-400 uppercase">/Ay (Hosting)</div>
                        </div>
                        {prices.serviceMonthly > 0 && (
                            <div className="text-center border-l border-gray-100">
                                <div className="text-lg font-bold text-green-600">{prices.serviceMonthly.toLocaleString()}₺</div>
                                <div className="text-[9px] text-green-400 uppercase">/Ay (Hizmet)</div>
                            </div>
                        )}
                    </div>
                    {/* Note: Total Cash Flow moved to next step */}
                    <div className="mt-3 text-[9px] text-gray-400 text-center">
                        * Ödeme planı ve vade seçenekleri son adımda belirlenir.
                    </div>
                </div>
             </div>
          </div>

          {/* RIGHT: CONTROLS */}
          <div className="w-full md:w-1/2 h-[65vh] md:h-full flex flex-col bg-[#F5F5F7]">
            <div className="flex-1 overflow-y-auto px-6 py-8 md:p-16">
              
              {/* Progress */}
              <div className="flex gap-1.5 mb-8">
                {steps.map((step, idx) => (
                  <div key={step.id} className={`h-1.5 flex-1 rounded-full transition-all ${idx <= currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                ))}
              </div>

              {/* Title */}
              <div className="mb-8">
                 <span className="text-blue-600 font-bold text-xs uppercase mb-1 block">Adım 0{currentStepIndex + 1}</span>
                 <h2 className="text-3xl font-bold mb-2 text-black">{activeStepData.title}</h2>
                 <p className="text-gray-500">{activeStepData.desc}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                 {activeStepData.options.map((option) => {
                    // @ts-ignore
                    const isSelected = activeStepData.type === 'single' ? selections[activeStepData.id] === option.id : selections[activeStepData.id].includes(option.id);
                    
                    return (
                       <button
                          key={option.id}
                          onClick={() => handleSelection(activeStepData.id, option.id, activeStepData.type)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden group
                             ${isSelected ? 'border-blue-600 bg-white shadow-xl translate-x-1' : 'border-transparent bg-white shadow-sm hover:border-gray-300'}`}
                       >
                          {option.isRecommended && (
                              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">
                                  ÖNERİLEN
                              </div>
                          )}

                          <div className="w-full flex items-center justify-between">
                             <div>
                                 <div className={`font-bold ${isSelected ? 'text-blue-600' : 'text-gray-900'} flex items-center gap-2`}>
                                     {option.label}
                                     {option.id === 'google_cloud' && <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 rounded border">Partner</span>}
                                 </div>
                                 <div className="text-xs text-gray-500 mt-0.5">{option.subLabel}</div>
                             </div>
                             <div className="text-right">
                                 {option.price > 0 && <div className="font-mono text-sm font-semibold">{option.price.toLocaleString()}₺</div>}
                                 {option.monthlyPrice !== undefined && (
                                    <div className="font-mono text-xs text-blue-500">
                                        {/* Display base monthly price here since cycle is selected later */}
                                        {option.monthlyPrice === 0 ? 'Ücretsiz' : `+${option.monthlyPrice.toLocaleString()}₺/ay`}
                                    </div>
                                 )}
                                 {option.price === 0 && !option.monthlyPrice && <div className="font-mono text-sm opacity-50">Dahil</div>}
                             </div>
                          </div>
                          
                          {/* GIFT BADGE */}
                          {option.giftLabel && (
                              <div className="mt-2 w-full pt-2 border-t border-dashed border-gray-100">
                                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded inline-block animate-pulse">
                                      {option.giftLabel}
                                  </span>
                              </div>
                          )}
                       </button>
                    );
                 })}
              </div>

              {/* Extra Budget Slider for Marketing */}
              {isMarketingStep && selections.marketing.length > 0 && (
                  <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 animate-fade-in shadow-sm">
                      <div className="flex justify-between mb-2">
                          <div>
                              <label className="text-sm font-bold text-blue-900 block">Medya Reklam Bütçesi</label>
                              <span className="text-[10px] text-blue-400">Google/Meta'ya doğrudan ödenecek tutar.</span>
                          </div>
                          <span className="font-mono font-bold text-blue-700 text-xl">{adBudget.toLocaleString()} TL</span>
                      </div>
                      <input 
                        type="range" 
                        min="5000" max="500000" step="5000" 
                        value={adBudget}
                        onChange={(e) => setAdBudget(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mt-2"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                          <span>5.000₺</span>
                          <span>500.000₺+</span>
                      </div>
                  </div>
              )}

            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-[#F5F5F7]/90 backdrop-blur-md flex justify-end gap-3 shrink-0">
                  {currentStepIndex > 0 && (
                     <button onClick={() => setCurrentStepIndex(prev => prev - 1)} className="px-6 py-3 rounded-full text-gray-600 hover:bg-gray-200 font-medium">Geri</button>
                  )}
                  {currentStepIndex < steps.length - 1 ? (
                     <button onClick={() => setCurrentStepIndex(prev => prev + 1)} className="px-8 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 shadow-lg">Sonraki</button>
                  ) : (
                     <button onClick={handleFinish} className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30">Teklifi Tamamla</button>
                  )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectPlanner;