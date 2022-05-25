import React from "react";
import { Cocktail } from "./Cocktail";
import { CocktailDB } from "./CocktailDB";
import { getCocktailByIdAPIUrl } from "../settings";
import { getCocktailByIdUrl } from "../settings";
import { useState, useEffect } from "react";
import beerGlass from "../images/beerGlass.png";
import cocktailGlass from "../images/cocktailGlass.jpg";
import cocktailGlass2 from "../images/cocktailGlass2.png";
import martiniGlass from "../images/martiniGlass.jpg";
import normalGlass from "../images/normalGlass.jpg";
import normalShortGlass from "../images/normalShortGlass.jpg";
import tallSkinnyGlass from "../images/tallSkinnyGlass.jpg";
import "../styles/cocktailRecipe.css";
import backgroundimg from "../images/CocktailsBackground.jpeg";
import LoadingIcons from "react-loading-icons";

export const CocktailRecipe = () => {
  const [cocktailAPI, setCocktailAPI] = useState([]);
  const [cocktailDB, setCocktailDB] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [imageOptions, setImageOptions] = useState([
    beerGlass,
    cocktailGlass,
    cocktailGlass2,
    martiniGlass,
    normalGlass,
    normalShortGlass,
    tallSkinnyGlass,
  ]);

  let currentUrl = window.location.href;
  let urlArray = currentUrl.split("/");
  const currentIndex = urlArray[urlArray.length - 1];

  useEffect(() => {
    if (currentIndex > 1000) {
      const getCocktail = async () => {
        const fromAPI = await getCocktailByIdAPI();
        setCocktailAPI(fromAPI);
      };
      getCocktail();
    } else {
      const getCocktailDB = async () => {
        const fromDB = await getCocktailById();
        setCocktailDB(fromDB);
      };
      getCocktailDB();
    }
  }, []);

  const getCocktailByIdAPI = async () => {
    document.querySelector(".loading").style.display = "block";
    const res = await fetch(getCocktailByIdAPIUrl + currentIndex);
    const data = await res.json();
    var drink = data.drinks[0];

    let index = 1;
    let ingredientArray = [];
    while (drink["strIngredient" + index]) {
      ingredientArray.push({
        key: index,
        name: drink["strIngredient" + index],
        amount: drink["strMeasure" + index]
          ? drink["strMeasure" + index]
          : "A dash ",
      });
      index++;
    }
    setIngredients(ingredientArray);
    document.querySelector(".loading").style.display = "none";
    return data.drinks[0];
  };

  const getCocktailById = async () => {
    document.querySelector(".loading").style.display = "block";
    const res = await fetch(getCocktailByIdUrl + currentIndex);
    const data = await res.json();
    document.querySelector(".loading").style.display = "none";
    return data;
  };

  const checkImgIndex = imageOptions.filter((img, index) => {
    if (cocktailDB.image != null || cocktailDB.image != undefined) {
      let afterSplit = cocktailDB.image.split(".");
      let afterSplitImg = img.split(".");
      if (afterSplitImg[0] === afterSplit[0]) {
        return img;
      }
    }
  });

  const styles = {
    bgElement: {
      backgroundImage: `url(${backgroundimg})`,
    },

    content: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      padding: "0 6%",
      width: "50%",
      margin: "22px auto",
    },
  };

  return (
    <div className="CocktailRecipes" style={styles.bgElement}>
      <LoadingIcons.ThreeDots className="loading" />
      {cocktailDB.length === 0 ? (
        <div style={styles.content}>
          <h3>{cocktailAPI.strDrink}</h3>
          <div className="CocktailRecipes-container">
            <img
              alt={cocktailAPI.strDrinkThumb}
              src={cocktailAPI.strDrinkThumb}
            ></img>
          </div>
          <li>Ingredients:</li>
          {ingredients.length > 1 &&
            ingredients.map((ingredient, index) => {
              return (
                <li className="ingredientLi" key={index}>
                  {ingredient.amount} {ingredient.name}
                </li>
              );
            })}
          <li>{cocktailAPI.strAlcoholic}</li>
          <li>Glass: {cocktailAPI.strGlass}</li>
          <li>Instructions: {cocktailAPI.strInstructions}</li>{" "}
        </div>
      ) : (
        <div style={styles.content}>
          <h3>{cocktailDB.name}</h3>
          <div className="CocktailRecipes-container">
            <img alt={cocktailDB.imageAlt} src={checkImgIndex}></img>
          </div>
          <li>Ingredients:</li>
          {cocktailDB.measurementsIngredients.length > 1 &&
            cocktailDB.measurementsIngredients.map((ingredient, index) => {
              return (
                <li className="ingredientLi" key={index}>
                  {ingredient.measurementIngredient}
                </li>
              );
            })}
          <li>{cocktailDB.alcoholic}</li>
          <li>Glass: {cocktailDB.glass}</li>
          <li>Instructions: {cocktailDB.instructions}</li>{" "}
        </div>
      )}
    </div>
  );
};

export default CocktailRecipe;
