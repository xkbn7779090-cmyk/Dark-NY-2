
export type CompanyType = 'alone' | 'partner' | 'friends' | 'family' | 'children';
export type BudgetType = '0-50' | '50-150' | '150-300' | '300+' | 'any';
export type NostalgiaType = 'mandarins' | 'olivie' | 'herring' | 'dedmoroz' | 'snegurochka';
export type VibeType = 'cozy' | 'calm' | 'creative' | 'minimal' | 'eco';

export interface PlannerData {
  age: number;
  company: CompanyType;
  budget: BudgetType;
  nostalgia: NostalgiaType[];
  familyHome: boolean;
  alcohol: boolean;
  vibe: VibeType[];
}

export interface PosterConfig {
  slogan: string;
  style: 'cyberpunk-noir' | 'dark-academic' | 'minimal' | 'glitch' | 'cozy';
}
