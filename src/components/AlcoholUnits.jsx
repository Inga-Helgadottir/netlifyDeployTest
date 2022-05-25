import React from "react";
import { useState } from "react";
import "../styles/AlcoholUnits.css";
import backgroundimg from "../images/CocktailsBackground.jpeg";

const AlcoholUnits = () => {
  const [shots, setShots] = useState(0);
  const [kilograms, setKilograms] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [gender, setGender] = useState("");
  const [bloodAlcoholLevel, setBloodAlcoholLevel] = useState("");
  const [soberAgain, setSoberAgain] = useState("");
  const [formFilled, setFormFilled] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!gender) {
      alert("Please add your gender");
      return;
    }
    if (!shots) {
      alert("Please add the amount of shots you havde consumed");
      return;
    }
    if (!kilograms) {
      alert("Please add how many kilogramms you weigh");
      return;
    }

    if (gender === "Male") {
      let BAL = 0.00176 * kilograms * (shots - 0.01 * kilograms * startDate);
      setBloodAlcoholLevel(BAL.toFixed(2));
      let checkSober =
        (shots - 0.01 * kilograms * startDate) * 0.01 * kilograms;

      let checkSoberString = checkSober.toString();
      const checkSoberSplit = checkSoberString.split("");
      if (checkSoberSplit.length === 1) {
        setSoberAgain(checkSober.toFixed(0));
      } else {
        setSoberAgain(checkSober.toFixed(2));
      }
    } else {
      let FBAL = 0.00218 * kilograms * (shots - 0.01 * kilograms * startDate);
      setBloodAlcoholLevel(FBAL.toFixed(2));
      let checkSober =
        (shots - 0.01 * kilograms * startDate) * 0.01 * kilograms;

      let checkSoberString = checkSober.toString();
      const checkSoberSplit = checkSoberString.split("");
      if (checkSoberSplit.length === 1) {
        setSoberAgain(checkSober.toFixed(0));
      } else {
        setSoberAgain(checkSober.toFixed(2));
      }
    }
    setFormFilled(true);
  };
  const styles = {
    bgElement: {
      backgroundImage: `url(${backgroundimg})`,
      marginBottom: "20px",
    },

    content: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  };

  return (
    <div style={styles.bgElement}>
      <div style={styles.content}>
        {!bloodAlcoholLevel && (
          <form onSubmit={onSubmit}>
            <h2>Find out what your blood alcohol level is</h2>
            <div className="form-control">
              <label>What is your gender?</label>

              <div
                className="radioBtns"
                onChange={(e) => setGender(e.target.value)}
              >
                <div className="radioOption">
                  <input type="radio" value="Male" name="gender" />
                  <label>Male</label>
                </div>
                <div className="radioOption">
                  <input type="radio" value="Female" name="gender" />
                  <label>Female</label>
                </div>
                <div className="radioOption">
                  <input type="radio" value="Other" name="gender" />
                  <label>Other</label>
                </div>
              </div>
            </div>

            <div className="form-control">
              <label>Input the amount of alcohol in shots?</label>

              <input
                type="number"
                placeholder="Number of shots"
                value={shots}
                onChange={(e) => setShots(e.target.value)}
              ></input>
            </div>

            <div className="form-control">
              <label>How many kilograms do you weigh?</label>

              <input
                type="number"
                placeholder="Kilograms"
                value={kilograms}
                onChange={(e) => setKilograms(e.target.value)}
              ></input>
            </div>

            <div className="form-control">
              <label>How many hours since you started drinking?</label>

              <input
                type="number"
                placeholder="hours since you started drinking"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>

            <input type="submit" value="Calculate units" className="btn" />
          </form>
        )}

        {soberAgain <= 0 && formFilled && (
          <div>
            <h2>You are sober!</h2>
            <a className="btn alcoholUnitsBackLink" href="/alcoholUnits">
              Click here to see the form again
            </a>
          </div>
        )}

        {soberAgain > 0 && (
          <div>
            <h2>Your blood alcohol level is: {bloodAlcoholLevel}!</h2>
            <h2>
              If you stop drinking now, you will be sober in {soberAgain} hours!
            </h2>
            <h2 className="dontDrive">PLEASE DO NOT DRIVE!</h2>
            <a className="btn alcoholUnitsBackLink" href="/alcoholUnits">
              Click here to see the form again
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlcoholUnits;
