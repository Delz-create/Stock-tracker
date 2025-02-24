import React, { useState } from "react";
import { debounce } from "lodash";

function SearchForm({ fetchStockData }) {
  const [symbol, setSymbol] = useState("");
  const [inputError, setInputError] = useState("");

  const debouncedFetchStockData = debounce((symbol) => {
    fetchStockData(symbol);
  }, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol.trim()) {
      setInputError("Please enter a stock symbol.");
      return;
    }
    if (!/^[A-Za-z]+$/.test(symbol)) {
      setInputError("Stock symbol should only contain letters.");
      return;
    }
    setInputError("");
    debouncedFetchStockData(symbol.toUpperCase());
  };

  return (
    <form
      className="search-input"
      onSubmit={handleSubmit}>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter Stock Symbol"
      />
      <button type="submit">Search</button>
      {inputError && <p className="input-error">{inputError}</p>}
    </form>
  );
}

export default SearchForm;
