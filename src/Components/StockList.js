import React from "react";
import { FaRegStar } from "react-icons/fa";

function StockList({ stocks, addFavorite }) {
  return (
    <ul id="stock-list">
      {stocks.map((stock, index) => (
        <li key={index}>
          <span className="symbol">{stock.symbol}</span>
          <span
            className="change"
            style={{ color: parseFloat(stock.change) >= 0 ? "green" : "red" }}>
            {stock.change}
          </span>
          <FaRegStar
            className="btn"
            onClick={() => addFavorite(stock.symbol)}
          />
        </li>
      ))}
    </ul>
  );
}

export default StockList;
