import React from 'react'

const Search = () => {
  return (
    <div className="w-[90%] max-w-xl mx-auto flex items-center gap-2">
      <input
        type="text"
        placeholder="Search for a country..."
        className='w-full py-5 px-8 rounded-lg shadow-md bg-white placeholder:text-gray-300'
      />
    </div>
  );
}

export default Search