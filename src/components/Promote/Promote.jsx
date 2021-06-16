import React from "react";
import IMAGES from "../../constants/images";
import Square from "../Square/Square";
import { move } from "../../game";

const promotionPieces = ["r", "n", "b", "q"];
const titles = ["Rook", "Knight", "Bishop", "Queen"];

const Promote = ({ promotion: { from, to, color } }) => {
  return (
    <div className="board">
      {promotionPieces.map((piece, index) => (
        <div
          title={titles[index]}
          key={`promotion_${index}`}
          style={{ width: "50%", height: "50%", cursor: "pointer" }}
          onClick={() => move(from, to, piece)}
        >
          <Square color={index % 3 === 0 ? "black" : "white"}>
            <img
              src={IMAGES[`${piece}_${color}`]}
              alt={`${piece}_${color}`}
              height="100%"
              width="100%"
            />
          </Square>
        </div>
      ))}
    </div>
  );
};

export default Promote;
