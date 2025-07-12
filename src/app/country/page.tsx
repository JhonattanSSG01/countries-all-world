"use client";

import countryServices from "@/api/country.service";
import API_CONFIG from "@/utils/apiConfig";
import { adaptCountryDetailList } from "@/utils/countryAdpater";
import { CountryDetail, ResponseCountry } from "@/utils/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  // Hooks
  const router = useRouter();
  const countryName = useSearchParams().get("name");

  // Helpers
  const initialData = {
    name: "",
    nativeName: "",
    population: 0,
    region: "",
    capital: "",
    subregion: "",
    flags: "",
    topLevelDomain: "",
    currencies: "",
    languages: [],
    borders: [],
  };

  // Local state
  const [country, setCountry] = React.useState<CountryDetail>(initialData);
  const [loading, setLoading] = React.useState<boolean>(true);

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
    setLoading(true);
    const API = await countryServices(API_CONFIG.NAME, countryName as string);

    const { data, status } = API;

    if (data?.length && status === 200) {
      const apiCountryDetail: CountryDetail[] = adaptCountryDetailList(
        data as ResponseCountry[]
      );

      // Destructuring
      const [country] = apiCountryDetail || [];

      // Get border countries
      const CODE = country.borders
        .map((border: string) => {
          return countryServices(API_CONFIG.CODE, border);
        })
        .map((API) => API);

      const responses = await Promise.all(CODE);

      const bordersName = responses.map((response) => {
        const { data } = response;
        return data[0].name.common;
      });

      country.borders = bordersName;

      // Update state
      setCountry(country);
    } else {
      setCountry(initialData);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, [countryName]);

  return (
    <div className="w-[90%] h-auto max-w-[90vw] mx-auto flex flex-col gap-12">
      <button
        className="w-fit py-3 px-8 flex justify-between items-center gap-2 rounded-lg shadow-lg cursor-pointer hover:opacity-80 transition-all light | md:mb-12"
        onClick={() => router.push("/")}
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
          <div className="w-full h-[clamp(40vh,45vh,50vh)] flex flex-col items-center justify-around gap-5 animate-pulse rounded shadow p-4 light | lg:flex-row">
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
              {country?.flags !== "" && (
                <Image
                  src={country?.flags}
                  alt="Bandera de país"
                  width={0}
                  height={0}
                  className="w-full h-full max-h-[40vh] object-cover"
                  loading="lazy"
                />
              )}
              <figcaption className="sr-only">
                Bandera de {country?.name}{" "}
              </figcaption>
            </figure>

            <article className="w-full max-w-2xl py-6 flex flex-col gap-6 | md:gap-8">
              <h4 className="text-xl font-extrabold">{country?.name}</h4>

              <div className="flex flex-col gap-10 | text-md | md:flex-row | 2xl:text-lg ">
                <section className="space-y-3">
                  <p>
                    <strong>Native Name: </strong>
                    {country.nativeName}
                  </p>
                  <p>
                    <strong>Population:</strong> {country?.population}
                  </p>
                  <p>
                    <strong>Region:</strong> {country?.region}
                  </p>
                  <p>
                    <strong>Sub Region:</strong> {country?.subregion}
                  </p>
                  <p>
                    <strong>Capital:</strong> {country?.capital}
                  </p>
                </section>

                <section className="space-y-3">
                  <p>
                    <strong>Top Level Domain:</strong> {country?.topLevelDomain}
                  </p>
                  <p>
                    <strong>Currencies:</strong> {country?.currencies}
                  </p>
                  <p>
                    <strong>Languages:</strong> {country?.languages}
                  </p>
                </section>
              </div>

              <div className="flex flex-col gap-4 | md:flex-row md:mt-4 md:items-center">
                <h5 className="text-lg font-extrabold">Border Countries:</h5>
                <div className="flex flex-wrap justify-start gap-2">
                  {country?.borders.map((border) => (
                    <button
                      key={border}
                      className="w-fit py-1 px-4 rounded-md shadow-xl cursor-pointer hover:opacity-80 transition-all light"
                      onClick={() => router.push(`/country?name=${border}`)}
                    >
                      {border}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          </>
        )}
      </section>
    </div>
  );
};

export default page;
