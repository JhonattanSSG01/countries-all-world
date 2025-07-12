"use client";

import countryServices from "@/api/country.service";
import Card from "@/components/Card";
import Search from "@/components/Search";
import { useDebounce } from "@/hooks/useDebounce";
import API_CONFIG from "@/utils/apiConfig";
import { Country, Region } from "@/utils/types";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  // Local state
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [region, setRegion] = React.useState<Region>(Region.All);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  
  // Hooks
  const router = useRouter();
  const debounceCountry = useDebounce(search, 500);

  /**
   * Return the param and url based on the current state.
   * 
   * If the region is not 'All', it returns the region as the param and the region url.
   * If the search is not empty, it returns the debounce search as the param and the name url.
   * Otherwise, it returns no param and the all url.
   * 
   * @returns {{param?: string, url: string}}
   */
const getParamAndUrl = (): { param?: string; url: string } => {
  if (region !== Region.All) {
    return {
      param: region,
      url: API_CONFIG.REGION,
    };
  }

  if (debounceCountry) {
    return {
      param: debounceCountry,
      url: API_CONFIG.NAME,
    };
  }

  return {
    param: undefined,
    url: API_CONFIG.ALL,
  };
};

  
  /**
   * Gets countries from API and updates state
   * 
   * When called, sets loading state to true
   * 
   * If the region is not 'All', it sends the region to the API
   * Otherwise, it sends the debounced search value
   * 
   * If the API returns a 200 status, it maps the response to
   * a Country array and updates the state
   * 
   * When finished, sets loading state to false
   */
  const getData = async () => {
    const { param, url } = getParamAndUrl();

    const API = await countryServices(url, param);

    const { data, status } = API;


    if (data?.length && status === 200) {
      const mapTodo: Country[] = data.map((item: any): Country => {
        const {name, flags, population, region, capital} = item
        return {
          name: name.common ,
          flag: flags.svg,
          population: population,
          region: region,
          capital: capital?.[0] ?? "",
        };
      });

      setCountries(mapTodo);

    } else {
      setCountries([]);
    }

    setLoading(false);
  };

  // Effects
  React.useEffect(() => {
    getData();
  }, [region, debounceCountry]);


  return (
    <div className="flex flex-col gap-12 h-screen">
      <Search
        onSelect={(region: Region) => setRegion(region)}
        onSearch={(search: string) => setSearch(search)}
      />
      <section className="w-full max-w-[60vw] mx-auto grid [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))] [grid-auto-rows:23rem] gap-15 md:max-w-[80vw]">
        {loading
          ? [...Array(9)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded shadow p-4"
              >
                <div className="w-full h-40 bg-gray-200 rounded mb-4" />
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              </div>
            ))
          : countries.map((country) => (
              <Card
                key={country.name}
                name={country.name}
                flag={country.flag}
                population={country.population}
                region={country.region}
                capital={country.capital}
                onClick={() => router.push(`/country?name=${country.name}`)}
              />
            ))}
      </section>
      {countries.length === 0 && (
        <div className="mx-auto flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-18 h-18 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-600">
            No se encontraron países
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Intenta buscar con otro nombre o región.
          </p>
        </div>
      )}
    </div>
  );
}
