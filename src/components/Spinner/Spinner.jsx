import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import spinner from "../../assets/spinner/spinner.json";

const Spinner = ({height = "80vh"}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
      }}
    >
      <Player
        autoplay
        loop
        src={spinner}
        style={{height: "80px", width: "80px"}}
      />
    </div>
  );
};

export default Spinner;
