import LogIn from "./components/LogIn";
import "./styles/App.css";
import "./styles/nav.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Header from "./components/Header";
import LogOut from "./components/LogOut";
import { loginUrl, signUpUrl } from "./settings";
import SignUp from "./components/SignUp";
import img from "./images/logowhite.png";

function App() {
  const [dropDown, setDropDown] = useState(false);
  const [callLinkCheck, setCallLinkCheck] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    if (loggedIn === "") {
      let userNameLS = localStorage.getItem("userName");
      let loggedInLS = localStorage.getItem("loggedIn");
      let userRoleLS = JSON.parse(localStorage.getItem("userRole"));

      setUserName(userNameLS);
      setLoggedIn(loggedInLS);
      setUserRole(userRoleLS);
    }

    if (callLinkCheck) {
      checkCurrentLink();
    }
  });

  const checkCurrentLink = () => {
    let currentUrl = window.location.href;
    let urlArray = currentUrl.split("/");
    let currentIndex = urlArray[urlArray.length - 1];
    let link = document.querySelectorAll(".links");

    if (!isNaN(currentIndex)) {
      if (urlArray[urlArray.length - 2] === "seeAllUsers") {
        currentIndex = "seeAllUsers";
      } else if (urlArray[urlArray.length - 2] === "seeCocktail") {
        currentIndex = "seeCocktails";
      }
    } else if (urlArray[urlArray.length - 2] === "changeUser") {
      currentIndex = "seeAllUsers";
    }

    if (currentIndex.includes("#")) {
      let indexArray = currentIndex.split("#");
      currentIndex = indexArray[0];
    }

    switch (currentIndex) {
      case "":
        removeActive();
        addActive(link[0]);
        break;

      case "seeCocktails":
        removeActive();
        addActive(link[1]);
        break;

      case "alcoholUnits":
        removeActive();
        addActive(link[2]);
        break;

      case "makeCocktail":
        removeActive();
        addActive(link[3]);
        break;

      case "seeAllUsers":
        removeActive();
        addActive(link[4]);
        break;

      case "changeUser":
        removeActive();
        addActive(link[4]);
        break;

      default:
        removeActive();
        addActive(link[0]);
        break;
    }
  };

  function checkAfterHalfAnHour(token) {
    setTimeout(function () {
      if (isTokenExpired(token)) {
        //true == expired
        logOutFunc();
      }
    }, 1800000);
  }

  function isTokenExpired(token) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  //set favicon
  var link = document.createElement("link");
  link.type = "image/png";
  link.rel = "icon";
  link.href = img;
  document.getElementsByTagName("head")[0].appendChild(link);

  const logInFunc = async (user) => {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (data.code !== null && data.code !== "" && data.code !== undefined) {
      alert(data.message);
      setLoggedIn(false);
    }

    if (
      data.username !== null &&
      data.username !== "" &&
      data.username !== undefined
    ) {
      setUserName(data.username);
      setUserRole(data.role0);
      let roleArray = [data.role0, data.role1];
      setUserRole(data.role0, data.role1);
      localStorage.setItem("userRole", JSON.stringify(roleArray));

      setLoggedIn(true);
      localStorage.setItem("userName", data.username);
      localStorage.setItem("loggedIn", true);
      checkAfterHalfAnHour(data.token);
      localStorage.setItem("token", data.token);
      window.location.reload();
    }
  };

  const signUpFunc = async (user) => {
    const res = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (data.code !== null && data.code !== "" && data.code !== undefined) {
      alert(data.message);
      setLoggedIn(false);
    }

    if (
      data.username !== null &&
      data.username !== "" &&
      data.username !== undefined
    ) {
      setUserName(data.username);
      setUserRole(data.role0);
      let roleArray = [data.role0, data.role1];
      setUserRole(data.role0, data.role1);
      localStorage.setItem("userRole", JSON.stringify(roleArray));

      setLoggedIn(true);
      localStorage.setItem("userName", data.username);
      localStorage.setItem("loggedIn", true);
      checkAfterHalfAnHour(data.token);
      localStorage.setItem("token", data.token);
      window.location.reload();
    }
  };

  const logOutFunc = async () => {
    setLoggedIn(false);
    setUserName("");
    setUserRole("");
    setCallLinkCheck(false);
    localStorage.clear();
    window.location.href = "/";
  };

  const removeActive = () => {
    let navLinks = document.querySelectorAll("nav a");
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
    }
  };

  const addActive = (e) => {
    if (e !== null && e !== undefined) {
      e.classList.add("active");
    }
  };

  return (
    <div className="App">
      <Header />

      {loggedIn ? (
        <WelcomePage name={userName} role={userRole} />
      ) : (
        <WelcomePage name="null" role="null" />
      )}

      {!dropDown && (
        <FaAngleDown
          className="dropDownIcon"
          onClick={(e) => {
            setDropDown(!dropDown);
            setCallLinkCheck(!callLinkCheck);
          }}
        />
      )}

      {dropDown && (
        <nav>
          <FaAngleUp
            className="dropDownIcon"
            onClick={(e) => {
              setDropDown(!dropDown);
            }}
          />
          <Link
            className="active links"
            onClick={(e) => {
              removeActive();
              addActive(e.target);
            }}
            to="/"
          >
            Home
          </Link>
          <Link
            className="links"
            to="/seeCocktails"
            onClick={(e) => {
              removeActive();
              addActive(e.target);
            }}
          >
            See all cocktails
          </Link>
          <Link
            className="links"
            to="/alcoholUnits"
            onClick={(e) => {
              removeActive();
              addActive(e.target);
            }}
          >
            Calculate alcohol units
          </Link>
          <Link
            className="links"
            to="/makeCocktail"
            onClick={(e) => {
              removeActive();
              addActive(e.target);
            }}
          >
            Make your own cocktail
          </Link>

          {userRole !== null &&
            userRole !== undefined &&
            userRole.includes("admin") && (
              <Link
                className="links"
                to="/seeAllUsers"
                onClick={(e) => {
                  removeActive();
                  addActive(e.target);
                }}
              >
                See all users
              </Link>
            )}
        </nav>
      )}
      <Outlet />

      {!loggedIn && (
        <div>
          <hr id="logInScroll" />
          <LogIn onAdd={logInFunc} />
          <hr id="signUpScroll" />
          <SignUp onAdd={signUpFunc} />
        </div>
      )}
      {loggedIn && (
        <div>
          <hr id="logOutScroll" />
          <LogOut onClick={logOutFunc} />
        </div>
      )}
    </div>
  );
}

export default App;
