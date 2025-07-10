import React from "react";

const Search = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const filterRef = React.useRef<HTMLButtonElement>(null);

  // Escucha global para detectar clics afuera
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    // Añadir evento al documento
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar evento cuando se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="w-[90%] max-w-[90vw] mx-auto flex flex-col justify-between items-start gap-12 | lg:flex-row lg:items-center">
      <form role="search" className="w-full">
        <label htmlFor="search" className="sr-only">
          Search for a country
        </label>
        <div className="relative max-w-xl">
          {/* Ícono de lupa dentro del input */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 2a8 8 0 105.293 14.293l5.707 5.707 1.414-1.414-5.707-5.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </div>

          <input
            type="search"
            id="search"
            placeholder="Search for a country..."
            className="w-full py-4 pl-12 pr-4 rounded-lg shadow-md bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </form>

      <div className="flex items-center">
        <section className="relative w-2xs">
          <button
            ref={filterRef}
            className="w-full py-4 px-8 rounded-lg shadow-md bg-white cursor-pointer text-left hover:bg-gray-200 transition-all"
            onClick={() => setOpen(!open)}
          >
            Filter by Region
          </button>

          {/* Ícono de flecha dentro del input */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="15"
            height="15"
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 ${
              open ? "rotate-270" : ""
            } transition-transform duration-300 ease-in-out`}
          >
            <path
              d="M9 5l7 7-7 7"
            />
          </svg>

          {open && (
            <ul className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-md z-10">
              <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
                Africa
              </li>
              <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
                America
              </li>
              <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
                Asia
              </li>
              <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
                Europe
              </li>
              <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
                Oceania
              </li>
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Search;
