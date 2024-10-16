import React from "react";

const SearchBar = ({ searchKeyword, setSearchKeyword, handleSearch }) => {
  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

export default SearchBar;
