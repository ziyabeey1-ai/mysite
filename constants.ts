
import { Project, Service } from './types';

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 1,
    title: "NOIR | Digital Runway",
    category: "Lüks Moda Deneyimi",
    description: "Sadece kıyafet satmayan, bir yaşam tarzı sunan dijital podyum. Next.js üzerinde kurgulanan akıcı WebGL geçişleri ve editoryal tasarım diliyle, ziyaretçiyi bir moda dergisinin içinde hissettiren e-ticaret deneyimi.",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", 
    link: "javascript:void(0)"
  },
  {
    id: 2,
    title: "Retansiyon Döngüsü",
    category: "Email Pazarlama Otomasyonu",
    description: "Kullanıcı davranışlarına göre tetiklenen, %65 açılma oranına sahip dinamik email serileri. Klaviyo ve özel HTML şablonları ile kurgulandı.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    link: "javascript:void(0)"
  },
  {
    id: 3,
    title: "Finansal Dashboard",
    category: "SaaS UI/UX",
    description: "Karmaşık finansal verileri basitleştiren, karanlık mod (Dark Mode) odaklı ve mikro-animasyonlarla güçlendirilmiş yönetim paneli.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    link: "javascript:void(0)"
  },
  {
    id: 4,
    title: "Mimarhane",
    category: "Kurumsal Web",
    description: "Mimarlık ofisleri için yatay akışlı, fotoğraf odaklı vitrin sitesi. İçerisinde müşteriler için özel giriş paneli barındırır.",
    imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    link: "javascript:void(0)"
  },
  {
    id: 5,
    title: "Şantiye Günlüğü",
    category: "Mimari Proje Yönetimi",
    description: "Mimarların müşterilerine şeffaf bir süreç sunmasını sağlayan SaaS paneli. Canlı timeline, bütçe takibi, hava durumu ve saha fotoğrafları tek ekranda.",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
    link: "javascript:void(0)"
  },
  {
    id: 6,
    title: "Gusto",
    category: "Gastronomi & Rezervasyon",
    description: "Fine dining restoranlar için atmosferi dijitale taşıyan, menü odaklı ve entegre rezervasyon sistemli web deneyimi.",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop",
    link: "javascript:void(0)"
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Web Geliştirme",
    description: "Next.js ve React ile ultra hızlı, SEO uyumlu ve ölçeklenebilir dijital varlıklar.",
    icon: "code"
  },
  {
    id: 2,
    title: "Email Stratejisi",
    description: "Spam kutusuna düşmeyen, satış odaklı ve kişiselleştirilmiş email hunileri.",
    icon: "mail"
  },
  {
    id: 3,
    title: "UX/UI Tasarım",
    description: "Kullanıcıyı yormayan, amacına direkt ulaştıran estetik arayüzler.",
    icon: "pen"
  }
];

export const SOCIAL_LINKS = {
    email: "yz.terzioglu@hotmail.com",
    linkedin: "https://www.linkedin.com/in/ziyabey",
    behance: "https://www.behance.net/ziyaterzi",
    github: "https://github.com",
    phone: "05302149000"
};
