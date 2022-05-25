import React from "react";
import "../styles/cocktail.css";

export const Cocktail = ({ props }) => {
  return (
    <div className="cocktail-container">
      <img alt={props.strDrink} src={props.strDrinkThumb} />
      <h2> {props.strDrink} </h2>
      <button className="btn">
        <a href={`/seeCocktail/${props.idDrink}`}>Get the recipe</a>
        {/* change href to correct link for one drink */}
      </button>
    </div>
  );
};
