"use client";

import countryServices from "@/api/country.service";
import API_CONFIG from "@/utils/apiConfig";
import { CountryDetail } from "@/utils/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  // Hooks
  const router = useRouter();
  const countryName = useSearchParams().get("name");

  // Local state
  const [country, setCountry] = React.useState<CountryDetail[]>([]);
  const [loading, setLoading] = React.useState(true);


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
    const API = await countryServices(API_CONFIG.NAME, countryName as string);

    const { data, status } = API;

    if (data?.length && status === 200) {
      const mapTodo: CountryDetail[] = data.map((item: any) => {
        const nativeNameKey = Object.keys(item.name.nativeName || {})[0];
        const nativeName = item.name.nativeName?.[nativeNameKey];

        const currencyKey = Object.keys(item.currencies || {})[0];
        const currency = item.currencies?.[currencyKey];

        return {
          name: item.name.common,
          nativeName: nativeName,
          population: item.population,
          region: item.region,
          capital: item.capital?.[0] ?? "",
          subregion: item.subregion,
          flag: item.flags.svg,
          topLevelDomain: item.tld?.[0] ?? "",
          currencies: currency?.name,
          languages: item.languages ? Object.values(item.languages) : [],
          borders: item.borders,
        };
      });

      setCountry(mapTodo);
    } else {
      setCountry([]);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[90%] max-w-[90vw] mx-auto flex flex-col gap-12 h-screen">
      <button
        className="w-fit py-3 px-8 mb-12 flex justify-between items-center gap-2 rounded-lg shadow-lg bg-white cursor-pointer hover:bg-gray-200 transition-all"
        onClick={() => router.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Back</span>
      </button>

      <section className="flex flex-col justify-between gap-10 | lg:flex-row lg:items-center">
        {loading ? (
          <div className="w-full h-[clamp(40vh,45vh,50vh)] flex flex-col items-center justify-around gap-5 animate-pulse bg-white rounded shadow p-4 | lg:flex-row">
            <div className="w-full h-full max-w-[60vh] bg-gray-200 mb-4" />
            <div className="w-full max-w-[80vh] flex flex-col gap-8">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ) : (
          <>
            <figure className="relative w-full h-full max-w-2xl flex justify-center">
              <Image
                src={country[0]?.flag}
                alt="Bandera de país"
                width={0}
                height={0}
                className="w-full h-full max-h-[40vh] object-cover"
                priority
              />
              <figcaption className="sr-only">
                Bandera de {country[0]?.name.common}{" "}
              </figcaption>
            </figure>

            <article className="w-full max-w-2xl py-6 flex flex-col gap-6 | md:gap-8">
              <h4 className="text-xl font-extrabold">
                {country[0]?.name.common}
              </h4>

              <div className="flex flex-col gap-10 | text-md | md:flex-row | 2xl:text-lg ">
                <section className="space-y-3">
                  <p>
                    <strong>Native Name: </strong>
                    {country[0]?.nativeName.common}
                  </p>
                  <p>
                    <strong>Population:</strong> {country[0]?.population}
                  </p>
                  <p>
                    <strong>Region:</strong> {country[0]?.region}
                  </p>
                  <p>
                    <strong>Sub Region:</strong> {country[0]?.subregion}
                  </p>
                  <p>
                    <strong>Capital:</strong> {country[0]?.capital}
                  </p>
                </section>

                <section className="space-y-3">
                  <p>
                    <strong>Top Level Domain:</strong>{" "}
                    {country[0]?.topLevelDomain}
                  </p>
                  <p>
                    <strong>Currencies:</strong> {country[0]?.currencies}
                  </p>
                  <p>
                    <strong>Languages:</strong> {country[0]?.languages}
                  </p>
                </section>
              </div>

              <div className="flex flex-col gap-4 | md:flex-row md:mt-4 md:items-center">
                <h5 className="text-lg font-extrabold">Border Countries:</h5>
                <button className="w-fit py-1 px-4 rounded-md shadow-xl bg-white cursor-pointer hover:bg-gray-200 transition-all">
                  {country[0]?.borders}
                </button>
              </div>
            </article>
          </>
        )}
      </section>
    </div>
  );
};

export default page;
