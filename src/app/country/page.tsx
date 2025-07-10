"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Country = {
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
};

const page = () => {
  const router = useRouter();
  const country = useSearchParams().get("name");
  const [information, setInformation] = React.useState<Country[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const data = await res.json();

      const mapTodo: Country[] = data.map((item: any) => {
        const nativeNameKey = Object.keys(item.name.nativeName || {})[0];
        const nativeName = item.name.nativeName?.[nativeNameKey];

        const currencyKey = Object.keys(item.currencies || {})[0];
        const currency = item.currencies?.[currencyKey];

        const language = Object.values(item.languages || {})[0];

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
          languages: language,
        };
      });
      setInformation(mapTodo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <p>Cargando país</p>;
  }

  return (
    <div className="flex flex-col gap-12 h-screen">
      <Header />
      <div className="max-w-[90vw] mx-auto | lg:w-[90%]">
        <button
          className="w-fit py-3 px-12 mb-8 rounded-lg shadow-lg bg-white cursor-pointer hover:bg-gray-200 transition-all"
          onClick={() => router.back()}
        >
          Back
        </button>

        <section className="flex flex-col justify-between gap-10 | lg:flex-row">
          <figure className="relative w-full h-80 max-w-2xl flex justify-center">
            <Image
              src={information[0]?.flag}
              alt="Bandera de país"
              width={0}
              height={0}
              className="w-full h-full object-cover"
              priority
            />
            <figcaption className="sr-only">
              Bandera de {information[0]?.name}{" "}
            </figcaption>
          </figure>

          <article className="w-full max-w-2xl py-6 flex flex-col gap-6">
            <h4 className="text-xl font-extrabold">{information[0]?.name}</h4>

            <div className="flex flex-col gap-10 | lg:flex-row">
              <section className="space-y-3 text-md">
                <p>
                  <strong>Native Name: </strong>
                  {information[0]?.nativeName.common}
                </p>
                <p>
                  <strong>Population:</strong> {information[0]?.population}
                </p>
                <p>
                  <strong>Region:</strong> {information[0]?.region}
                </p>
                <p>
                  <strong>Sub Region:</strong> {information[0]?.subregion}
                </p>
                <p>
                  <strong>Capital:</strong> {information[0]?.capital}
                </p>
              </section>

              <section className="space-y-3 text-md">
                <p>
                  <strong>Top Level Domain:</strong>{" "}
                  {information[0]?.topLevelDomain}
                </p>
                <p>
                  <strong>Currencies:</strong> {information[0]?.currencies}
                </p>
                <p>
                  <strong>Languages:</strong> {information[0]?.languages}
                </p>
              </section>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default page;
