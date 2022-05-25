import React from "react";
import { useState } from "react";
import backgroundimg from "../images/CocktailsBackground.jpeg";

const LogIn = ({ onAdd }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Please enter a user name");
      return;
    }
    if (!password) {
      alert("Please enter a password");
      return;
    }

    onAdd({ username, password });

    setUserName("");
    setPassword("");
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
        <h2>Log in</h2>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label>User name</label>
            <input
              className="formInput"
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              className="formInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <input type="submit" value="Log in" className="myButton" />
        </form>
      </div>
    </div>
  );
};

export default LogIn;
