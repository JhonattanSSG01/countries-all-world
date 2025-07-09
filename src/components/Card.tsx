import Image from 'next/image'
import React from 'react'

type Props = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
}


const Card = ({ name, flag, population, region, capital } : Props) => {
  return (
    <article className="w-full max-w-sm mx-auto rounded-lg shadow-lg bg-white">
      <figure className="flex justify-center">
        <Image
          src={flag || ""}
          alt="Vercel Logo"
          width={0}
          height={0}
          className="w-full h-full object-contai rounded-t-lg"
        />
        <figcaption className="sr-only">Bandera de {name || ""}</figcaption>
      </figure>

      <div className="p-6">
        <h4 className="mb-4 text-lg font-semibold">{name || ""}</h4>

        <section className="space-y-1">
          <p>
            <strong>Population</strong> {population || ""}
          </p>
          <p>
            <strong>Region</strong> {region || ""}
          </p>
          <p>
            <strong>Capital</strong> {capital || ""}
          </p>
        </section>
      </div>
    </article>
  );
}

export default Card