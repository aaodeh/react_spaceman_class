import "./styles.css";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ImageBox from "./components/ImageBox";

export default function App() {
  return (
    <div className="App">
      <AppBar className="appBar" position="static">
        <Typography variant="h6">News</Typography>
      </AppBar>

      <ImageBox tries={9} className="mainImage"></ImageBox>
      {/* <img  src="spaceMan_1.png" alt="spaceman" /> */}
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
    </div>
  );
}
