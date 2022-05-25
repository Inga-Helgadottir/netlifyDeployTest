import React from "react";
// add the logo to the images folder and change the path here to the logo here
// import img from "../images/glass.jpg";
import "../styles/header.css";
import img from "../images/logo.png";
import backgroundimg from "../images/rainbow.jpg";
import imgBC from "../images/CocktailsBackground.jpeg";
import WelcomePage from "./WelcomePage";
import MakeCocktails from "./MakeCocktails";
import { Cocktails } from "./Cocktails";

const Header = () => {
  return (
    <header
      style={{
        backgroundImage: `url(${backgroundimg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100%",
      }}
    >
      <img src={img} alt="JOIM Logo" />
      <h1>COCKTAILS</h1>
      {/* https://www.w3schools.com/cssref/pr_background-image.asp */}

      {/* <ul>
        <li>
          <a href={WelcomePage}>Home</a>
        </li>
        <li>
          <a href={Cocktails}>Cocktails</a>
        </li>
        <li>
          <a href={MakeCocktails}>Make a Cocktail</a>
        </li>
         <li><a href="about.asp">About</a></li> 
      </ul> */}
    </header>
  );
};

export default Header;

// import React from "react";
// // add the logo to the images folder and change the path here to the logo here
// // import img from "../images/glass.jpg";

// const Header = () => {
//   return (
//     <header>
//       <h1>This is our CA 2 project</h1>
//       {/* <img src={img} alt="JAIM Logo" /> */}
//       {/* https://www.w3schools.com/cssref/pr_background-image.asp */}
//     </header>
//   );
// };

// export default Header;
