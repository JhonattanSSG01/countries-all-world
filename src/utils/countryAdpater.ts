import { Country, CountryDetail, ResponseCountry } from "./types";

/**
 * Adapts a ResponseCountry object to a CountryDetail object
 *
 * @param {ResponseCountry} data
 * @returns {CountryDetail}
 */
const adaptCountryDetail = (data: ResponseCountry): CountryDetail => {
  const { name, flags, population, region, subregion, tld, borders } = data;
  // Native name
  const nativeNames = Object.entries(data.name.nativeName).map(
    ([key, value]) => value.common
  );

  // Capital
  const [capital = "N/A"] = data.capital || [];

  // Top level domain
  const [topLevelDomain = "N/A"] = tld || [];

  // Currency
  const currencyKey = Object.keys(data.currencies || {})[0];
  const currency = data.currencies?.[currencyKey];

  return {
    name: name.common,
    nativeName: nativeNames.join(", "),
    population: population,
    region: region,
    capital: capital,
    subregion: subregion || "N/A",
    flags: flags.svg,
    topLevelDomain: topLevelDomain,
    currencies: currency?.name || "N/A",
    languages: Object.values(data.languages),
    borders: borders,
  };
};
/**
 * Maps an array of ResponseCountry to an array of CountryDetail.
 *
 * @param {ResponseCountry[]} dataList
 * @returns {CountryDetail[]}
 */
export const adaptCountryDetailList = (
  dataList: ResponseCountry[]
): CountryDetail[] => {
  return dataList.map(adaptCountryDetail);
};

/**
 * Adapts a ResponseCountry object to a Country object
 *
 * @param {ResponseCountry} data
 * @returns {Country}
 */
const adaptCountry = (data: ResponseCountry): Country => {
  const { name, flags, population, region } = data;
  const [capital = "N/A"] = data.capital || [];
  return {
    name: name.common,
    flags: flags.svg,
    population: population,
    region: region,
    capital: capital,
  };
};

/**
 * Maps an array of ResponseCountry to an array of Country.
 *
 * @param {ResponseCountry[]} dataList
 * @returns {Country[]}
 */
export const adaptCountryList = (dataList: ResponseCountry[]): Country[] => {
  return dataList.map(adaptCountry);
};
