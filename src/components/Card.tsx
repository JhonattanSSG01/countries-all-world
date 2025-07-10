import Image from 'next/image'
import React from 'react'

type Props = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
  onClick: () => void
}


const Card = ({ name, flag, population, region, capital, onClick } : Props) => {
  return (
    <article className="w-full h-fit rounded-lg shadow-lg bg-white md:cursor-pointer md:hover:shadow-2xl md:hover:scale-105 transition-all" onClick={onClick}>
      <figure className="relative w-full h-48 flex justify-center">
        <Image
          src={flag || ""}
          alt="Bandera de país"
          width={0}
          height={0}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <figcaption className="sr-only">Bandera de {name || ""}</figcaption>
      </figure>

      <div className="p-6">
        <h4 className="mb-4 text-lg font-extrabold">{name || ""}</h4>

        <section className="space-y-1 text-sm">
          <p>
            <strong>Population:</strong> {population || ""}
          </p>
          <p>
            <strong>Region:</strong> {region || ""}
          </p>
          <p>
            <strong>Capital:</strong> {capital || ""}
          </p>
        </section>
      </div>
    </article>
  );
}

export default Card