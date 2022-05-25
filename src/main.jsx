import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CocktailRecipe from "./components/CocktailRecipe";
import { Cocktails } from "./components/Cocktails";
import AlcoholUnits from "./components/AlcoholUnits";
import MakeCocktails from "./components/MakeCocktails";
import SeeAllUsers from "./components/SeeAllUsers";
import ChangeUser from "./components/ChangeUser";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="seeCocktail/:id" element={<CocktailRecipe />}></Route>
        <Route path="seeCocktails" element={<Cocktails />}></Route>
        <Route path="alcoholUnits" element={<AlcoholUnits />}></Route>
        <Route path="makeCocktail" element={<MakeCocktails />}></Route>
        <Route path="seeAllUsers" element={<SeeAllUsers />}></Route>
        <Route path="changeUser" element={<ChangeUser />}></Route>
        <Route path="changeUser/:id" element={<ChangeUser />}></Route>
      </Route>
      <Route
        // default for when the link is wrong
        // like this http://localhost:3000/hjklhjklh
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <h1>There's nothing here!</h1>
            <p>
              <a href="/">To go back click here!</a>
            </p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
);
