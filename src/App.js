import react, { useState, useRef } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ImageBox from "./components/ImageBox";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { gameImages } from "./data.js";
import "./styles.css";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  const [phrase, setPhrase] = useState("coat rack");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setwrongGuesses] = useState(0);
  const [showWrongAlert, setShowWrongAlert] = useState(false);
  const [showCorrectAlert, setShowCorrectAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const textInput = useRef(null);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

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
        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h6">Spaceman</Typography>
          <Button color="inherit" onClick={handleDialogOpen}>
            Word Bank
          </Button>
        </div>
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

      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle>Work Bank</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Phrase"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Type in your phrase"
            inputRef={textInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setPhrase(textInput.current.value.toLowerCase());
              handleDialogClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
