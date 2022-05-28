import React, { useEffect } from "react";
import "../styles/cocktail.css";
import { useState } from "react";
import beerGlass from "../images/beerGlass.png";
import cocktailGlass from "../images/cocktailGlass.jpg";
import cocktailGlass2 from "../images/cocktailGlass2.png";
import martiniGlass from "../images/martiniGlass.jpg";
import normalGlass from "../images/normalGlass.jpg";
import normalShortGlass from "../images/normalShortGlass.jpg";
import tallSkinnyGlass from "../images/tallSkinnyGlass.jpg";

export const CocktailDB = ({ props }) => {
  const [test, setTest] = useState("");
  const [imageOptions, setImageOptions] = useState([
    beerGlass,
    cocktailGlass,
    cocktailGlass2,
    martiniGlass,
    normalGlass,
    normalShortGlass,
    tallSkinnyGlass,
  ]);
  useEffect(() => {
    imageOptions.filter((img, index) => {
      let afterSplit = props.image.split(".");
      let afterSplitImg = img.split(".");
      let lastSplit = afterSplit[0].split("/");
      let lastSplitImg = afterSplitImg[0].split("/");
      if (lastSplit[2] === lastSplitImg[3]) {
        setTest(img);
      }

      if (lastSplit[3] === lastSplitImg[3]) {
        setTest(img);
      }
    });
  }, []);

  const checkImgIndex = imageOptions.filter((img, index) => {
    let afterSplit = props.image.split(".");
    let afterSplitImg = img.split(".");
    let lastSplit = afterSplit[0].split("/");
    let lastSplitImg = afterSplitImg[0].split("/");
    if (lastSplit[2] === lastSplitImg[3]) {
      return img;
    }

    if (lastSplit[3] === lastSplitImg[3]) {
      return img;
    }
  });

  return (
    <div className="cocktail-container">
      <img alt={props.imageAlt} src={test} />
      <h2> {props.name} </h2>
      <button className="btn">
        <a href={`/seeCocktail/${props.id}`}>Get the recipe</a>
      </button>
    </div>
  );
};
