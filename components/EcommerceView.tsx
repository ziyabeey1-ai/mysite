import React, { useState } from 'react';

interface EcommerceViewProps {
  onBack: () => void;
  onLaunchWizard?: () => void;
}

// --- MOCK DATA ---
const MOCK_ORDERS = [
  { id: '#TR-8832', customer: 'Ahmet Yılmaz', date: '10 dk önce', amount: '₺1,450.00', status: 'Tamamlandı' },
  { id: '#TR-8833', customer: 'Selin Demir', date: '32 dk önce', amount: '₺3,200.00', status: 'Kargoda' },
  { id: '#TR-8834', customer: 'Mehmet Öz', date: '1 saat önce', amount: '₺850.50', status: 'Bekliyor' },
  { id: '#TR-8835', customer: 'Ayşe Kaya', date: '2 saat önce', amount: '₺12,050.00', status: 'Tamamlandı' },
  { id: '#TR-8836', customer: 'Caner Erkin', date: '3 saat önce', amount: '₺450.00', status: 'İptal' },
];

const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Deri Ceket', stock: 12, price: '₺4,500', category: 'Giyim', status: 'Yayında' },
  { id: 2, name: 'Kablosuz Kulaklık Pro', stock: 45, price: '₺2,200', category: 'Elektronik', status: 'Yayında' },
  { id: 3, name: 'Minimalist Masa Lambası', stock: 0, price: '₺850', category: 'Ev & Yaşam', status: 'Tükendi' },
  { id: 4, name: 'Ergonomik Ofis Sandalyesi', stock: 8, price: '₺3,400', category: 'Mobilya', status: 'Yayında' },
  { id: 5, name: 'Akıllı Saat Series 5', stock: 24, price: '₺5,100', category: 'Elektronik', status: 'Yayında' },
];

const EcommerceView: React.FC<EcommerceViewProps> = ({ onBack, onLaunchWizard }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile

  // Toggle Sidebar for Mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // --- SUB-COMPONENTS ---

  const NavItem = ({ id, icon, label }: { id: typeof activeTab, icon: React.ReactNode, label: string }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
      <div className={`${activeTab === id ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>{icon}</div>
      <span className="font-medium text-sm">{label}</span>
      {activeTab === id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
    </button>
  );

  const DashboardContent = () => (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Ciro', val: '₺142,392', change: '+12.5%', color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Aktif Sipariş', val: '24', change: '+4', color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Ziyaretçi', val: '8,432', change: '+18.2%', color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Dönüşüm', val: '3.2%', change: '-0.4%', color: 'text-red-400', bg: 'bg-red-500/10' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#161617] border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-colors">
             <div className="flex justify-between items-start mb-4">
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>{stat.change}</span>
             </div>
             <div className="text-2xl font-bold text-white">{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Sales Chart */}
         <div className="lg:col-span-2 bg-[#161617] border border-white/5 p-4 md:p-6 rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h3 className="font-bold text-white">Satış Analizi</h3>
                <select className="bg-black/30 text-xs text-gray-400 border border-white/10 rounded-lg px-3 py-1 outline-none w-full md:w-auto">
                    <option>Son 7 Gün</option>
                    <option>Bu Ay</option>
                    <option>Bu Yıl</option>
                </select>
            </div>
            <div className="h-48 md:h-64 flex items-end gap-2 md:gap-4 overflow-x-auto pb-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                    <div key={i} className="flex-1 group relative min-w-[20px]">
                        <div 
                            className="w-full bg-blue-900/20 rounded-t-sm hover:bg-blue-600 transition-all duration-300 relative overflow-hidden" 
                            style={{ height: `${h}%` }}
                        >
                            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Recent Activity */}
         <div className="bg-[#161617] border border-white/5 p-6 rounded-2xl flex flex-col h-full max-h-[400px]">
            <h3 className="font-bold text-white mb-6">Son İşlemler</h3>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {[1, 2, 3, 4, 5].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-lg shrink-0">🛍️</div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm text-white font-medium truncate">Yeni Sipariş</div>
                            <div className="text-xs text-gray-500">2 dakika önce</div>
                        </div>
                        <div className="text-sm font-bold text-green-400">+₺450</div>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#161617] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-white text-sm md:text-base">Son Siparişler</h3>
              <button 
                onClick={() => setActiveTab('orders')}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                  Tümünü Gör →
              </button>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400 whitespace-nowrap">
                  <thead className="bg-white/5 text-gray-200 uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                          <th className="px-6 py-4">Sipariş ID</th>
                          <th className="px-6 py-4">Müşteri</th>
                          <th className="px-6 py-4 hidden md:table-cell">Tarih</th>
                          <th className="px-6 py-4">Tutar</th>
                          <th className="px-6 py-4">Durum</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                      {MOCK_ORDERS.map((order) => (
                          <tr key={order.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 font-mono text-blue-400">{order.id}</td>
                              <td className="px-6 py-4 text-white font-medium">{order.customer}</td>
                              <td className="px-6 py-4 hidden md:table-cell">{order.date}</td>
                              <td className="px-6 py-4 text-white">{order.amount}</td>
                              <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                      order.status === 'Tamamlandı' ? 'bg-green-500/10 text-green-400' :
                                      order.status === 'Bekliyor' ? 'bg-yellow-500/10 text-yellow-400' :
                                      order.status === 'Kargoda' ? 'bg-blue-500/10 text-blue-400' :
                                      'bg-red-500/10 text-red-400'
                                  }`}>
                                      {order.status}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );

  const ProductsContent = () => (
      <div className="space-y-6 animate-fade-in pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Ürün Yönetimi</h2>
              <button className="w-full md:w-auto px-4 py-3 md:py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-900/20">
                  + Yeni Ürün Ekle
              </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {MOCK_PRODUCTS.map((product) => (
                  <div key={product.id} className="bg-[#161617] border border-white/5 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl">
                      <div className="h-48 bg-gray-800 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700 font-bold text-4xl select-none group-hover:scale-105 transition-transform duration-500">
                             {product.name.charAt(0)}
                          </div>
                          <div className="absolute top-2 right-2">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase backdrop-blur-md ${product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                 {product.stock > 0 ? `Stok: ${product.stock}` : 'Tükendi'}
                             </span>
                          </div>
                      </div>
                      <div className="p-4">
                          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                          <h3 className="text-white font-bold mb-2 truncate">{product.name}</h3>
                          <div className="flex justify-between items-center mt-4">
                              <span className="text-lg font-bold text-white">{product.price}</span>
                              <button className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">
                                  Düzenle
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
              <div className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px] text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/5 cursor-pointer transition-all">
                  <div className="text-4xl mb-2">+</div>
                  <div className="text-sm font-bold">Hızlı Ekle</div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans flex overflow-hidden selection:bg-blue-500/30">
        
        {/* --- MOBILE SIDEBAR BACKDROP --- */}
        {isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
            ></div>
        )}

        {/* --- 1. SIDEBAR (DRAWER ON MOBILE) --- */}
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-[#0c0c0e] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0
            ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-blue-900/20' : '-translate-x-full'}
        `}>
            
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-white/5 justify-between md:justify-start">
                <div className="flex items-center">
                     <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xl mr-3">Y</div>
                     <span className="font-bold text-white tracking-tight text-lg">YZT Panel</span>
                </div>
                {/* Close Button Mobile */}
                <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4 mb-2 pt-2">Yönetim</div>
                <NavItem 
                    id="dashboard" 
                    label="Genel Bakış" 
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} 
                />
                <NavItem 
                    id="orders" 
                    label="Siparişler" 
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>} 
                />
                <NavItem 
                    id="products" 
                    label="Ürünler" 
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>} 
                />
                <NavItem 
                    id="customers" 
                    label="Müşteriler" 
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} 
                />
            </nav>

            {/* Bottom User Area */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
                    <div>
                        <div className="text-sm font-bold text-white">Yusuf Ziya</div>
                        <div className="text-[10px] text-gray-500">Admin</div>
                    </div>
                </div>
            </div>
        </aside>


        {/* --- 2. MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#050505] w-full">
            
            {/* Top Header */}
            <header className="h-16 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-6 z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    {/* HAMBURGER MENU (MOBILE) */}
                    <button 
                        onClick={() => setIsSidebarOpen(true)} 
                        className="text-gray-400 hover:text-white transition-colors md:hidden p-1"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    
                    {/* BACK BUTTON TO PORTFOLIO */}
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-gray-300 border border-white/10 transition-colors group"
                    >
                        <svg className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        <span className="hidden md:inline">Portfolyoya Dön</span>
                        <span className="md:hidden">Çıkış</span>
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={onLaunchWizard}
                        className="hidden md:flex bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
                    >
                        Bu Paneli Satın Al
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-2 hidden md:block"></div>
                    <button className="text-gray-400 hover:text-white relative">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#0c0c0e]"></div>
                    </button>
                </div>
            </header>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Breadcrumb / Title */}
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            {activeTab === 'dashboard' && 'Genel Bakış'}
                            {activeTab === 'products' && 'Ürün Kataloğu'}
                            {activeTab === 'orders' && 'Sipariş Yönetimi'}
                            {activeTab === 'customers' && 'Müşteri Listesi'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    {/* DYNAMIC CONTENT RENDERING */}
                    {activeTab === 'dashboard' && <DashboardContent />}
                    {activeTab === 'products' && <ProductsContent />}
                    {activeTab === 'orders' && (
                        <div className="bg-[#161617] border border-white/5 rounded-2xl p-10 text-center animate-fade-in">
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-white font-bold mb-2">Sipariş Modülü</h3>
                            <p className="text-gray-500 text-sm">Bu alan demo sürümünde sadece "Genel Bakış" tablosunda aktiftir.</p>
                            <button onClick={() => setActiveTab('dashboard')} className="mt-4 text-blue-400 text-sm hover:underline">Genel Bakışa Dön</button>
                        </div>
                    )}
                    {activeTab === 'customers' && (
                        <div className="bg-[#161617] border border-white/5 rounded-2xl p-10 text-center animate-fade-in">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-white font-bold mb-2">Müşteri Segmentasyonu</h3>
                            <p className="text-gray-500 text-sm">CRM entegrasyonu bu demoda simüle edilmektedir.</p>
                        </div>
                    )}

                </div>
            </div>

            {/* Mobile Bottom Action (Wizard) */}
             <div className="md:hidden p-4 bg-[#0c0c0e] border-t border-white/5 sticky bottom-0 z-30">
                <button 
                    onClick={onLaunchWizard}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg"
                >
                    Bu Paneli Satın Al
                </button>
             </div>

        </main>

        <style>{`
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #0c0c0e; 
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #333; 
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
        `}</style>
    </div>
  );
};

export default EcommerceView;