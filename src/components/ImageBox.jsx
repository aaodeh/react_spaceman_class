import react, { useState } from "react";
import { gameImages } from "../data";

const ImageBox = ({ tries }) => {
  // const [graphic, setGraphic] = useState([
  //   "spaceMan_1.png",
  //   "spaceMan_2.png",
  //   "spaceMan_3.png",
  //   "spaceMan_4.png",
  //   "spaceMan_5.png",
  //   "spaceMan_6.png",
  //   "spaceMan_7.png",
  //   "spaceMan_8.png",
  //   "spaceMan_9.png",
  //   "spaceManGameOver.gif"
  // ]);

  const style = {
    width: "650px",
    height: "400px",
    backgroundImage: `url(${gameImages[tries]})`,
    backgoundRepeat: "no-repeat",
    backgroundSize: "650px 400px"
  };

  return <div style={style}></div>;
};

ImageBox.defaultProps = { tries: 0 };

export default ImageBox;
