import React from 'react'

const Header = () => {
  return (
    <header className="py-8 px-10 flex justify-between items-center shadow-md bg-white">
      <h2 className="text-xl font-bold">Where in the world?</h2>
      <button className="text-lg capitalize cursor-pointer">dark mode</button>
    </header>
  );
}

export default Header