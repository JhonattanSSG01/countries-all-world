"use client";

import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Search from "@/components/Search";
import React from "react";

type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
};

export default function Home() {
  const [information, setInformation] = React.useState<Country[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/independent?status=true"
      );
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
    return <p>Cargando países…</p>;
  }

  return (
    <div className="flex flex-col gap-12 h-screen">
      <Header />
      <Search />
      <Filter />
      {information.map((item: any) => (
        <Card
          key={item.name}
          name={item.name}
          flag={item.flag}
          population={item.population}
          region={item.region}
          capital={item.capital}
        />
      ))}
    </div>
  );
}
