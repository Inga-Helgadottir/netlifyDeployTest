import React from "react";
import "../styles/welcomePage.css";

const WelcomePage = ({ name, role }) => {
  return (
    <div style={{ marginBottom: "20px", marginTop: "2%" }}>
      {name === "null" ? (
        <div>
          <h2>Welcome!</h2>
          <p className="welcomePTag">
            <span className="bold">Welcome to Cocktail by JOIM!</span> <br />
            <br />
            Here you can choose a category and pick any cocktail you might want
            to make and get the recipe for that specific cocktail.
            <br />
            You can also make your own recipe by adding your ingredients, and
            our site will add it to our menu after you publish it.
          </p>
          <h3>You are not logged in</h3>
          <div className="logInSignUpLinks">
            <a
              href="#logInScroll"
              className="btn"
              style={{ color: "black", textDecoration: "none" }}
            >
              Click here to log in
            </a>
            <a
              href="#signUpScroll"
              className="btn"
              style={{ color: "black", textDecoration: "none" }}
            >
              Click here to Sign up
            </a>
          </div>
        </div>
      ) : role[1] === null ? (
        <div>
          <h2>Welcome {name} !</h2>
          <h3>Your role on this site is {role[0]}</h3>
          <p className="welcomePTag">
            <span className="bold">Welcome to Cocktail by JOIM!</span> <br />
            <br />
            Here you can choose a category and pick any cocktail you might want
            to make and get the recipe for that specific cocktail.
            <br />
            You can also make your own recipe by adding your ingredients, and
            our site will add it to our menu after you publish it.
          </p>
          <a
            href="#logOutScroll"
            className="btn"
            style={{ color: "black", textDecoration: "none" }}
          >
            Click here to log out
          </a>
        </div>
      ) : (
        <div>
          <h2>Welcome {name} !</h2>
          <h3>
            Your roles on this site are {role[0]} and {role[1]}
          </h3>
          <a
            href="#logOutScroll"
            className="btn"
            style={{ color: "black", textDecoration: "none" }}
          >
            Click here to log out
          </a>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
