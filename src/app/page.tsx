"use client";

import countryServices from "@/api/country.service";
import Card from "@/components/Card";
import Header from "@/components/Header";
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
    const value = region !== Region.All ? region : debounceCountry || "";

    const url = region !== Region.All ? API_CONFIG.REGION : API_CONFIG.NAME;


    const countries = await countryServices(url, value);

    const { data, status } = countries;

    console.log(data);
    

    if (data && status === 200) {
      const mapTodo: Country[] = data.map((item: any) => {
        return {
          name: item.name.common,
          flag: item.flags.svg,
          population: item.population,
          region: item.region,
          capital: item.capital?.[0] ?? "",
        };
      });

      setCountries(mapTodo);

    }

    setLoading(false);
  };

  // Effects
  React.useEffect(() => {
    getData();
  }, [region, debounceCountry]);


  return (
    <div className="flex flex-col gap-12 h-screen">
      <Header />
      <Search
        onSelect={(region: Region) => setRegion(region)}
        onSearch={(search: string) => setSearch(search)}
      />
      <section className="w-full max-w-[60vw] mx-auto grid [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))] [grid-auto-rows:23rem] gap-15 md:max-w-[80vw]">
        {loading ? (
          [...Array(9)].map((_, index) => (
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
        ) : countries.length > 0 ? (
          countries.map((country) => (
            <Card
              key={country.name}
              name={country.name}
              flag={country.flag}
              population={country.population}
              region={country.region}
              capital={country.capital}
              onClick={() => router.push(`/country?name=${country.name}`)}
            />
          ))
        ) : (
          <p>No se encontraron países</p>
        )}
      </section>
    </div>
  );
}
