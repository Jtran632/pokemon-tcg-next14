export interface ICardData {
  id: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
  };
  supertype: string;
  name: string;
  number: string;
}

export interface IFavCard {
  id?: number;
  cardId?: string | null;
  imageUrl?: string | null;
  userId?: number | null;
}

export interface ItcgSetData {
  id: string;
  name: string;
  series: string;
  images: {
    symbol: string;
    logo: string;
  };
  ptcgoCode?: string;
  printedTotal: number;
  total: number;
  releaseDate: string;
}
export interface ItcgSet {
  tcgSets: {
    data: ItcgSetData[];
  };
}
