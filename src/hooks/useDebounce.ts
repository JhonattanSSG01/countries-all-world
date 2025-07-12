import React from 'react'

/**
 * useDebounce
 * 
 * Hook que devuelve el valor "debounceado" de una cadena, es decir, el valor
 * que se tiene despues de un cierto tiempo sin cambios.
 * 
 * @param value Valor a deboucear
 * @param delay Tiempo en milisegundos a esperar antes de considerar que el
 * valor no ha cambiado.
 * @returns El valor debouceado
 */
export const useDebounce = (value: string, delay: number) => {
 const [debouncedValue, setDebouncedValue] = React.useState(value);

 React.useEffect(() => {
   const handler = setTimeout(() => {
     setDebouncedValue(value);
   }, delay);

   return () => {
     clearTimeout(handler);
   };
 }, [value, delay]);

 return debouncedValue;
}
