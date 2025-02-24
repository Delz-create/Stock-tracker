import React from "react";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import StockList from "./Components/StockList";
import Favorites from "./Components/Favourites";
import useStockTracker from "./Hooks/useStockerTracker";

function App() {
  const {
    stocks,
    error,
    loading,
    fetchStockData,
    favorites,
    addFavorite,
    removeFavorite,
  } = useStockTracker();

  return (
    <div className="container">
      <h1>Stock Tracker</h1>
      <SearchForm fetchStockData={fetchStockData} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <StockList
        stocks={stocks}
        addFavorite={addFavorite}
      />
      <Favorites
        favorites={favorites}
        removeFavorite={removeFavorite}
      />
    </div>
  );
}

export default App;
