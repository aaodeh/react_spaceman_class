import react, { useState } from "react";
import "./styles.css";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ImageBox from "./components/ImageBox";
import { gameImages } from "./data.js";

export default function App() {
  const [turn, setTurn] = useState(0);

  const handleImageTest = () => {
    setTurn((prev) => (prev + 1) % gameImages.length);
  };

  return (
    <div className="App">
      <AppBar color="secondary" className="appBar" position="static">
        <Typography variant="h6">Spaceman</Typography>
      </AppBar>
      <ImageBox key={1} tries={turn} className="mainImage"></ImageBox>
      {/* the keyboard */}
      <div className="keyboard">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((s) => {
          return (
            <Button
              key={s}
              className="letter"
              variant="contained"
              color="primary"
            >
              {s}
            </Button>
          );
        })}
      </div>

      <Button variant="contained" onClick={handleImageTest}>
        Image Test
      </Button>

      {turn}
    </div>
  );
}
