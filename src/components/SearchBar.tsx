import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState(" ");
  return (
    <div className="border-t border-b bg-gray-50 text-center ">
    <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="flex-1 outline-none bg-inherit text-sm "
      />
      <img src="/search_icon.png" alt="" className="w-4" />
    </div>
  </div>
  )
}

export default SearchBar