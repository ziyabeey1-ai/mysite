import React, { useState, useEffect } from 'react';

const RoiCalculator: React.FC = () => {
  const [traffic, setTraffic] = useState(5000);
  const [conversionRate, setConversionRate] = useState(1.5);
  const [orderValue, setOrderValue] = useState(500);
  
  // Results
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [projectedRevenue, setProjectedRevenue] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    // Basic calculation: Traffic * (ConvRate / 100) * OrderValue
    const current = traffic * (conversionRate / 100) * orderValue;
    
    // YZT Impact: Assuming we improve conversion by 40% (Apple-style UX optimization)
    // and potentially increase order value by 10% (better brand perception)
    const improvedConvRate = conversionRate * 1.4; 
    const improvedOrderValue = orderValue * 1.1;
    
    const projected = traffic * (improvedConvRate / 100) * improvedOrderValue;
    
    setCurrentRevenue(Math.round(current));
    setProjectedRevenue(Math.round(projected));
    setDifference(Math.round(projected - current));
  }, [traffic, conversionRate, orderValue]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="roi" className="section-stack min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 md:px-6 py-24 relative overflow-hidden border-t border-white/10">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-green-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl md:text-6xl font-semibold text-white tracking-tighter mb-4 md:mb-6">
                Tasarım Yatırımdır.
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-2">
                Kötü tasarım para kaybettirir. İyi tasarım ise para kazandırır.
                <br className="hidden md:block"/>
                <span className="text-apple-blue block mt-2">Mevcut metriklerinizi girin, potansiyelinizi görün.</span>
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center bg-[#161617] p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-white/5 shadow-2xl">
            
            {/* Input Section */}
            <div className="space-y-8 md:space-y-10">
                {/* Traffic Slider */}
                <div>
                    <div className="flex justify-between mb-4 items-end">
                        <label className="text-gray-400 font-medium text-sm md:text-base">Aylık Ziyaretçi</label>
                        <span className="text-white font-bold font-mono text-lg md:text-xl">{traffic.toLocaleString()}</span>
                    </div>
                    <input 
                        type="range" 
                        min="1000" 
                        max="100000" 
                        step="1000" 
                        value={traffic} 
                        onChange={(e) => setTraffic(Number(e.target.value))}
                        className="w-full accent-apple-blue h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Conversion Slider */}
                <div>
                    <div className="flex justify-between mb-4 items-end">
                        <label className="text-gray-400 font-medium text-sm md:text-base">Dönüşüm Oranı (%)</label>
                        <span className="text-white font-bold font-mono text-lg md:text-xl">%{conversionRate.toFixed(1)}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0.1" 
                        max="10" 
                        step="0.1" 
                        value={conversionRate} 
                        onChange={(e) => setConversionRate(Number(e.target.value))}
                        className="w-full accent-apple-blue h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* AOV Slider */}
                <div>
                    <div className="flex justify-between mb-4 items-end">
                        <label className="text-gray-400 font-medium text-sm md:text-base">Sepet Tutarı</label>
                        <span className="text-white font-bold font-mono text-lg md:text-xl">{formatCurrency(orderValue)}</span>
                    </div>
                    <input 
                        type="range" 
                        min="100" 
                        max="5000" 
                        step="50" 
                        value={orderValue} 
                        onChange={(e) => setOrderValue(Number(e.target.value))}
                        className="w-full accent-apple-blue h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            {/* Result Section */}
            <div className="relative bg-black/50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/5 text-center lg:text-left h-full flex flex-col justify-center overflow-hidden">
                <div className="space-y-2 mb-6 md:mb-8 opacity-60">
                    <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500">Mevcut Aylık Ciro</p>
                    <p className="text-xl md:text-2xl font-mono text-gray-300">{formatCurrency(currentRevenue)}</p>
                </div>
                
                <div className="space-y-2 md:space-y-4">
                     <p className="text-xs md:text-sm uppercase tracking-widest text-apple-blue font-semibold">YZT Etkisi ile Tahmini Ciro</p>
                     <p className="text-4xl md:text-6xl font-bold text-white tracking-tight animate-pulse-slow">
                        {formatCurrency(projectedRevenue)}
                     </p>
                </div>

                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10">
                    <p className="text-gray-400 text-xs md:text-sm mb-2">Potansiyel Aylık Kazanç Artışı</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-400">+{formatCurrency(difference)}</p>
                </div>

                {/* Decorative glow behind numbers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-48 h-32 md:h-48 bg-blue-600/20 rounded-full blur-[60px] md:blur-[80px] -z-10"></div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;