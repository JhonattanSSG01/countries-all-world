"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { useRouter } from "next/navigation";
import React from "react";

type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
};

export default function Home() {
  const router = useRouter()
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [filtered, setFiltered] = React.useState<Country[]>([]);
  const [region, setRegion] = React.useState<string | null>(null);
   const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true); 

  const getData = async () => {
    const url = region ? `https://restcountries.com/v3.1/region/${region}` : "https://restcountries.com/v3.1/independent?status=true";
    try {
      const res = await fetch(url);
      const data = await res.json();
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
      setFiltered(mapTodo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, [region]);

  React.useEffect(() => {
    if (search.trim().length >= 3) {
      const result = countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(result);
    } else {
      setFiltered(countries); 
    }
  }, [search, countries]);

  if (loading) {
    return <p>Cargando países…</p>;
  }

  return (
    <div className="flex flex-col gap-12 h-screen">
      <Header />
      <Search
        onSelect={(region: string) => setRegion(region)}
        onSearch={(search: string) => setSearch(search)}
      />
      <section className="w-full max-w-[60vw] mx-auto grid [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))] [grid-auto-rows:23rem] gap-15 md:max-w-[80vw]">
        {filtered.length > 0 ? (
          filtered.map((country) => (
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
          <p>No se encontraron resultados</p>
        )}
      </section>
    </div>
  );
}
