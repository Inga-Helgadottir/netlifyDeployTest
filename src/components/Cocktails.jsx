import React from "react";
import { Cocktail } from "./Cocktail";
import { useState, useEffect } from "react";
import { cocktalLetterUrl, allCocktailsDB } from "../settings";
import "../styles/cocktails.css";
import { CocktailDB } from "./CocktailDB";
import backgroundimg from "../images/CocktailsBackground.jpeg";
import LoadingIcons from "react-loading-icons";

export const Cocktails = () => {
  const [cocktailsList, setCocktailsList] = useState([]);
  const [cocktailsListDB, setCocktailsListDB] = useState([]);

  useEffect(() => {
    const getCocktails = async () => {
      const fromAPI = await getCocktailList("a");
      setCocktailsList(fromAPI);
    };
    getCocktails();

    const getCocktailsDB = async () => {
      const fromDB = await getCocktailListDB();
      setCocktailsListDB(fromDB);
    };
    getCocktailsDB();
  }, []);

  const getCocktailList = async (letter) => {
    document.querySelector(".loading").style.display = "block";
    const res = await fetch(cocktalLetterUrl + letter);
    const data = await res.json();
    document.querySelector(".loading").style.display = "none";
    return data.drinks;
  };

  const getCocktailListDB = async () => {
    document.querySelector(".loading").style.display = "block";
    const res = await fetch(allCocktailsDB);
    const data = await res.json();
    document.querySelector(".loading").style.display = "none";
    return data;
  };

  const styles = {
    bgElement: {
      backgroundImage: `url(${backgroundimg})`,
    },

    content: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  };

  return (
    <div className="allCocktails" style={styles.bgElement}>
      <LoadingIcons.ThreeDots className="loading" />
      <div style={styles.content}>
        <div className="Cocktails">
          {cocktailsList.length > 0 &&
            cocktailsList.map((element, index) => {
              return <Cocktail key={index} props={element} />;
            })}
        </div>
        {cocktailsListDB.length > 0 && (
          <h2 style={{ marginTop: "15px" }}>Cocktails made by our users</h2>
        )}
        <div className="Cocktails">
          {cocktailsListDB.length > 0 &&
            cocktailsListDB.map((cocktail, index) => {
              return <CocktailDB key={index} props={cocktail} />;
            })}
        </div>
      </div>
    </div>
  );
};
