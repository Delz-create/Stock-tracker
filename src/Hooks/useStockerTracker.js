import { useState, useEffect } from "react";

const useStockTracker = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchTopStocks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.alphavantage.co/query?function=SECTOR&apikey=YOUR_API_KEY"
      );
      const data = await response.json();
      const stocksData = data["Rank A: Real-Time Performance"];
      const topStocks = Object.keys(stocksData)
        .slice(0, 10)
        .map((symbol) => ({
          symbol,
          change: stocksData[symbol],
        }));
      setStocks(topStocks);
    } catch (error) {
      setError("Failed to fetch top stocks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStockData = async (symbol) => {
    if (!symbol) {
      fetchTopStocks();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YOUR_API_KEY`
      );
      const data = await response.json();
      const quote = data["Global Quote"];
      if (quote && quote["10. change percent"]) {
        const changePercent = quote["10. change percent"].replace("%", "");
        setStocks([{ symbol, change: changePercent }]);
      } else {
        setError("Invalid Symbol");
        setStocks([]);
      }
    } catch (error) {
      setError("Failed to fetch stock data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (symbol) => {
    if (!favorites.includes(symbol)) {
      setFavorites([...favorites, symbol]);
    } else {
      setError(`${symbol} is already in your favorites`);
    }
  };

  const removeFavorite = (symbol) => {
    setFavorites(favorites.filter((fav) => fav !== symbol));
  };

  useEffect(() => {
    fetchTopStocks();
  }, []);

  return {
    stocks,
    error,
    loading,
    fetchStockData,
    favorites,
    addFavorite,
    removeFavorite,
  };
};

export default useStockTracker;
