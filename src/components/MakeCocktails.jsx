import React from "react";
import "../styles/makeCocktails.css";
import { useState } from "react";
import beerGlass from "../images/beerGlass.png";
import cocktailGlass from "../images/cocktailGlass.jpg";
import cocktailGlass2 from "../images/cocktailGlass2.png";
import martiniGlass from "../images/martiniGlass.jpg";
import normalGlass from "../images/normalGlass.jpg";
import normalShortGlass from "../images/normalShortGlass.jpg";
import tallSkinnyGlass from "../images/tallSkinnyGlass.jpg";
import { makeCocktailUrl } from "../settings";
import backgroundimg from "../images/CocktailsBackground.jpeg";

const MakeCocktails = () => {
  const [inputList, setInputList] = useState([{ service: "" }]);
  const [name, setName] = useState("");
  const [alcoholic, setAlcoholic] = useState("0"); /* NEW */
  const [glass, setGlass] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const [imageOptions, setImageOptions] = useState([
    beerGlass,
    cocktailGlass,
    cocktailGlass2,
    martiniGlass,
    normalGlass,
    normalShortGlass,
    tallSkinnyGlass,
  ]);

  const makeCocktailFunc = async (cocktail) => {
    const res = await fetch(makeCocktailUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cocktail),
    });

    const data = await res.json();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let measurementsIngredients = [];

    document.querySelectorAll(".miInput").forEach((element) => {
      measurementsIngredients.push({
        id: measurementsIngredients.length,
        measurementIngredient: element.value,
      });
    });

    let drink = {
      name,
      alcoholic,
      glass,
      instructions,
      image,
      imageAlt,
      measurementsIngredients,
    };

    if (!name) {
      alert("Please enter a name for you drink");
      return;
    }
    if (!alcoholic) {
      alert("Please tell us if your drink contains alcohol");
      return;
    }
    if (!glass) {
      alert("Please enter what glass your drink should be served in");
      return;
    }
    if (!instructions) {
      alert("Please input the instructions for making your drink");
      return;
    }
    if (!image) {
      alert("Please choose an image for your drink");
      return;
    }
    if (measurementsIngredients.length < 1) {
      alert("Please add the ingredients for your drink");
      return;
    }

    makeCocktailFunc(drink);

    setName("");
    setAlcoholic("");
    setGlass("");
    setInstructions("");
    setImage("");
    setImageAlt("");
    document.querySelectorAll(".miInput").forEach((element) => {
      element.style.border = "solid 0.5px black";
    });
    alert("You have made a cocktail");
  };

  const settingAlcoholic = (e) => {
    if (e === "Yes") {
      setAlcoholic("Acloholic");
    } else if (e === "No") {
      setAlcoholic("Non alcoholic");
    }
  };

  const handleInputAdd = (e) => {
    e.preventDefault();
    setInputList([...inputList, { service: "" }]);
  };

  const imageClicked = (index, option, imageOption) => {
    let imageOptionArray = document.querySelectorAll(".imageOption");
    imageOptionArray.forEach((element) => {
      element.style.border = "solid 0.5px black";
    });
    imageOptionArray[index].style.border = "solid 2px red";
    setImage(imageOption);
    setImageAlt(name);
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
    <div style={styles.bgElement}>
      <div style={styles.content}>
        <h2>Make your own cocktail</h2>

        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label>Name of your cocktail?</label>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="form-control">
            <label>Does this drink contail alcohol?</label>
            <select onChange={(e) => settingAlcoholic(e.target.value)}>
              <option value="0">Is there alcohol?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-control">
            <label>What kind of glass should you put your drink in?</label>
            <input
              type="text"
              placeholder="Glass"
              value={glass}
              onChange={(e) => setGlass(e.target.value)}
            ></input>
          </div>

          <div className="form-control">
            <label>What are the instructions for making your drink?</label>
            <textarea
              type="text"
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label>What ingredients are needed to make your drink?</label>

            {inputList.map((singleInput, index) => {
              return (
                <input
                  className="miInput"
                  key={index}
                  type="text"
                  placeholder="1/2 shot Vodka"
                ></input>
              );
            })}

            <button onClick={handleInputAdd} className="btn">
              Click here to add another ingredient
            </button>
          </div>

          <div className="form-control">
            <label>Which of these images looks the most like your drink?</label>

            <div id="images">
              {imageOptions.map((imageOption, index) => {
                let optionAltArray = imageOption.split(/[./]/);
                let option = optionAltArray[3];
                return (
                  <img
                    className={"imageOption imageOption" + index}
                    key={index}
                    src={imageOption}
                    alt={option}
                    onClick={(e) => {
                      imageClicked(index, option, imageOption);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <input type="submit" value="Make your cocktail" className="btn" />
        </form>
      </div>
    </div>
  );
};

export default MakeCocktails;
