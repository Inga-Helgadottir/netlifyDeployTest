import React from "react";
import { changeUserRoleUrl } from "../settings";
import { useState, useEffect } from "react";
import backgroundimg from "../images/CocktailsBackground.jpeg";
import "../styles/changeUser.css";
import LoadingIcons from "react-loading-icons";

const ChangeUser = () => {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error !== null || error !== undefined) {
      let error = localStorage.getItem("error");
      setError(error);
    }
    if (userName === "") {
      let currentUrl = window.location.href;
      let urlArray = currentUrl.split("/");
      const currentIndex = urlArray[urlArray.length - 1];
      setUserName(currentIndex);
    }
  }, []);

  const changeUserRole = async (jsonContext) => {
    document.querySelector(".loading").style.display = "block";
    let token = localStorage.getItem("token");
    const res = await fetch(changeUserRoleUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(jsonContext),
    });
    const data = await res.json();
    if (data.code === 500) {
      alert("there was an error");
    } else {
      alert("You have changed this users role");
    }
    document.querySelector(".loading").style.display = "none";
    return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (role === 0 || role === "") {
      alert("Please choose a role");
      return;
    }

    changeUserRole({ userName, role });

    setRole("");
  };

  const styles = {
    bgElement: {
      backgroundImage: `url(${backgroundimg})`,
      padding: "5%",
    },

    content: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  };

  return (
    <div>
      <LoadingIcons.ThreeDots className="loading" />
      {error ? (
        <div style={styles.bgElement}>
          <div style={styles.content}>
            <form onSubmit={onSubmit}>
              <h2>Change the user: {userName}</h2>
              <div className="form-control">
                <label>Users new role</label>
                <select
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="0">Select a role:</option>
                  <option value="admin">Admin</option>
                  <option value="stopAdmin">Only a User</option>
                </select>
              </div>

              <input type="submit" value="Submit" className="btn" />
            </form>
            <div className="this">
              <a className="btn backToSeeAllUsers" href="/seeAllUsers">
                Go back to see all users
              </a>
            </div>
          </div>
        </div>
      ) : (
        <h2>You do not have access to this page</h2>
      )}
    </div>
  );
};

export default ChangeUser;
