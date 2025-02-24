import React from "react";
import { FaStar } from "react-icons/fa";

function Favorites({ favorites, removeFavorite }) {
  return (
    <div className="Favorites">
      <h2>Favorites</h2>
      <ul>
        {favorites.map((symbol, index) => (
          <li key={index}>
            <div className="Favorites_symbol">{symbol}</div>

            <div className="Favorite_btn">
              <FaStar
                className="btn"
                onClick={() => removeFavorite(symbol)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
