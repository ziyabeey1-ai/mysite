export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export enum SectionType {
  HERO = 'HERO',
  PORTFOLIO = 'PORTFOLIO',
  SERVICES = 'SERVICES',
  CONTACT = 'CONTACT'
}