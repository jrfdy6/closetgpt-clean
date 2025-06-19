export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  preferences: {
    style: string[];
    colors: string[];
    occasions: string[];
  };
  measurements: {
    height: number;
    weight: number;
    bodyType: string;
    skinTone?: string;
  };
  stylePreferences: string[];
  sizePreference?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
  favoriteColors?: string[];
  favoriteStyles?: string[];
  favoriteBrands?: string[];
  favoriteOccasions?: string[];
  favoriteSeasons?: string[];
  favoriteMaterials?: string[];
  favoritePatterns?: string[];
  favoriteSilhouettes?: string[];
  favoriteAccessories?: string[];
  favoriteShoes?: string[];
  favoriteOuterwear?: string[];
  favoriteBottoms?: string[];
  favoriteTops?: string[];
  favoriteDresses?: string[];
  favoriteSuits?: string[];
  favoriteFormal?: string[];
  favoriteCasual?: string[];
  favoriteAthletic?: string[];
  favoriteBusiness?: string[];
  favoriteEvening?: string[];
  favoriteBeach?: string[];
  favoriteWinter?: string[];
  favoriteSummer?: string[];
  favoriteSpring?: string[];
  favoriteFall?: string[];
} 