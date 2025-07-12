import { Region } from "@/utils/types";
import React from "react";

// Data
const regions = [
  Region.All,
  Region.Africa,
  Region.America,
  Region.Asia,
  Region.Europe,
  Region.Oceania,
];

const Search = ({
  onSelect,
  onSearch,
}: {
  onSelect: (region: Region) => void;
  onSearch: (search: string) => void;
}) => {
  // Local state
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Region>(Region.All);
  const [search, setSearch] = React.useState("");

  // Ref
  const filterRef = React.useRef<HTMLButtonElement>(null);
  const optionsRef = React.useRef<HTMLUListElement>(null);

  /**
   * Handles the selection of a region.
   *
   * Sets the selected region, triggers the onSelect callback,
   * clears the search input, and closes the dropdown menu.
   *
   * @param {Region} region - The region that has been selected.
   */

  const handleSelect = (region: Region) => {
    setSelected(region);
    onSelect(region);
    setSearch("");
    setOpen(false);
  };

  /**
   * Function that handles the search input.
   *
   * Listens for the input's onChange event and updates the search state with
   * the input's value. Then, if the value is greater than 2,
   * calls the onSearch function with the input's value; otherwise, it calls the
   * onSearch function with an empty string.
   *
   * @param e React.ChangeEvent<HTMLInputElement> event
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setSearch(onlyLetters);
    search.length >= 2 ? onSearch(onlyLetters) : onSearch("");
  };

  // Effect
  React.useEffect(() => {
    // Global listening to detect clicks outside
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
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
            value={search}
            onChange={(e) => handleSearch(e)}
            autoComplete="off"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSearch(e as unknown as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </div>
      </form>

      <div className="flex items-center">
        <div className="relative w-3xs">
          <section className="flex gap-3">
            <button
              ref={filterRef}
              className="w-full py-4 px-8 flex flex-row-reverse items-center justify-between rounded-lg shadow-md bg-white cursor-pointer text-left hover:bg-gray-200 transition-all"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="15"
                height="15"
                className={`rotate-90 ${
                  open ? "rotate-270" : ""
                } transition-transform duration-300 ease-in-out`}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span>{selected}</span>
            </button>

            {selected !== Region.All && (
              <button
                className="group p-4 rounded-lg shadow-md bg-white cursor-pointer text-left hover:bg-gray-300 transition-all"
                onClick={() => handleSelect(Region.All)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="transform group-hover:rotate-90 transition-transform duration-300 ease-in-out"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </section>

          {/* Ícono de flecha dentro del input */}
          {open && (
            <ul
              ref={optionsRef}
              className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-md z-10"
            >
              {regions
                .filter(
                  (region) => region !== selected && region !== Region.All
                )
                .map((region) => (
                  <li key={region}>
                    <button
                      onClick={() => handleSelect(region)}
                      className="w-full py-1 px-8 text-left cursor-pointer hover:bg-gray-200 transition-all"
                    >
                      {region}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
