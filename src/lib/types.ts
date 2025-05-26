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
  rarity: string;
  cardmarket: {
    url: string | undefined;
    prices: any;
  };
  tcgplayer: {
    prices: {
      [key: string]: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number | null;
      };
    };
    url: string | undefined;
  };
}
export interface ICardRarities {
  common: ICardData[];
  uncommon: ICardData[];
  rare: ICardData[];
  rarePlus: ICardData[];
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

export interface IFavs {
  favs: {
    id: number;
    cardId: string | null;
    imageUrl: string | null;
    userId: string | null;
  }[];
}
