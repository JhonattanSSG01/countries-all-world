// Globals types
export type NativeName = {
  [languageCode: string]: {
    official: string;
    common: string;
  };
};

export type Name = {
  common: string;
  official: string;
  nativeName: NativeName[];
}

type Flags = {
  svg: string;
  png?: string;
}

type Currencies = {
  [currencyCode: string]: {
    name: string;
    symbol: string;
  };
};  

type Languages = {
  [languageCode: string]: string;
};

// Typoes from API
export type ResponseCountry = {
  name: Name;
  flags: Flags;
  population: number;
  region: string;
  capital: string[];
  subregion: string;
  tld: string[];
  currencies: Currencies;
  languages: Languages;
  borders: string[];
}

// Type Base
export type Country = {
  name: string;
  flags: string;
  population: number;
  region: string;
  capital: string;
};

export interface CountryDetail extends Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  capital: string;
  subregion: string;
  flags: string;
  topLevelDomain: string;
  currencies: string;
  languages: string[];
  borders: string[];
};

// Response from API
export type ResponseApi = {
  message: string;
  status: number;
  data: ResponseCountry[];
}

// Enums
 export enum Region {
  All = "Filter by Region",
  Africa = "Africa",
  America = "America",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}
