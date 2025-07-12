export type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
};

export type CountryDetail = {
  name: string;
  nativeName: {
    official: string;
    common: string;
  };
  population: number;
  region: string;
  capital: string;
  subregion: string;
  flag: string;
  topLevelDomain: string[];
  currencies: string;
  languages: string;
  borders: string[];
};

export type ResponseApi = {
  message: string;
  status: number;
  data?: Country[];
}

 export enum Region {
  All = "Filter by Region",
  Africa = "Africa",
  America = "America",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}
