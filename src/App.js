import react, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ImageBox from "./components/ImageBox";
import { gameImages } from "./data.js";
import "./styles.css";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  const [phrase, setPhrase] = useState("you are my best friend, i think");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setwrongGuesses] = useState(0);
  const [showWrongAlert, setShowWrongAlert] = useState(false);
  const [showCorrectAlert, setShowCorrectAlert] = useState(false);

  let symbolsToshow = [",", "-"];

  const handleGuessedLetter = (letter) => {
    setGuessedLetters((prev) => [...prev, letter]);

    if (!phrase.includes(letter)) {
      setwrongGuesses((prev) => prev + 1);
      setShowWrongAlert(true);
    } else {
      setShowCorrectAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowWrongAlert(false);
    setShowCorrectAlert(false);
  };

  return (
    <div className="App">
      <AppBar color="secondary" className="appBar" position="static">
        <Typography variant="h6">Spaceman</Typography>
      </AppBar>

      <div className="dashBoard">
        <img
          className="graphic"
          src={gameImages[wrongGuesses]}
          alt={`guess_${wrongGuesses}`}
        />

        <div className="wordDisplay">
          {phrase.split("").map((letter) => {
            return (
              <span className="letterDisplay">
                {guessedLetters.includes(letter) ||
                symbolsToshow.includes(letter)
                  ? letter
                  : letter !== " "
                  ? "_"
                  : " "}
              </span>
            );
          })}
        </div>

        {/* the keyboard */}
        <div className="keyboard">
          {"abcdefghijklmnopqrstuvwxyz".split("").map((s) => {
            return (
              <Button
                key={s}
                className="letter"
                variant="contained"
                color="primary"
                value={s}
                disabled={guessedLetters.includes(s)}
                onClick={() => handleGuessedLetter(s)}
              >
                {s}
              </Button>
            );
          })}
        </div>
      </div>

      <Snackbar
        open={showWrongAlert}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert severity="error">Incorrect Guess!</Alert>
      </Snackbar>

      <Snackbar
        open={showCorrectAlert}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert severity="success">Correct!</Alert>
      </Snackbar>

      {`${wrongGuesses} wrong guesses`}
    </div>
  );
}
