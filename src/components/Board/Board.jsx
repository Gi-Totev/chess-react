import { useState, useEffect } from "react";
import Tile from "../Tile/Tile";

const Board = ({ board, turn }) => {
  const [currentBoard, setCurrentBoard] = useState([]);

  useEffect(() => {
    setCurrentBoard(turn === "w" ? board.flat() : board.flat().reverse());
  }, [board, turn]);

  const getPosition = (i) => {
    const x = turn === "w" ? i % 8 : Math.abs(~~(i % 8) - 7);
    const y = turn === "w" ? Math.abs(~~(i / 8) - 7) : ~~(i / 8);

    return { x, y };
  };

  const getColor = (i) => {
    const { x, y } = getPosition(i);
    if ((x + y) % 2 === 1) {
      return "black";
    }
    return "white";
  };

  const getBoardCoordinates = (i) => {
    const { x, y } = getPosition(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  };

  return (
    <div className="board">
      {currentBoard.map((piece, i) => (
        <div key={`tile_${i}`} className="tile">
          <Tile
            piece={piece}
            tileColor={getColor(i)}
            position={getBoardCoordinates(i)}
          />
        </div>
      ))}
    </div>
  );
};

export default Board;
