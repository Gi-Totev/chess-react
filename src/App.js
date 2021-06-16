import React, { useEffect, useState } from "react";
import { gameSubject, initGame, resetGame } from "./game";
import Board from "./components/Board/Board";

const App = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [turn, setTurn] = useState(null);

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(() => game.board);
      setIsGameOver(() => game.isGameOver);
      setResult(() => game.result);
      setTurn(game.turn);
    });

    return () => subscribe.unsubscribe();
  }, []);

  return (
    <div className="container">
      {isGameOver && (
        <h2
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "5rem",
            textShadow: "1px 1px 2px black",
            zIndex: "1",
          }}
        >
          Game Over{" "}
          <button
            style={{
              padding: "1rem",
              width: "50%",
              cursor: "pointer",
              color: "#222",
              fontWeight: "bold",
              borderRadius: "5px",
            }}
            onClick={resetGame}
          >
            <span>New Game</span>
          </button>
          <span>{result}</span>
        </h2>
      )}
      <div
        className="game-container"
        style={{ opacity: isGameOver ? "0.3" : "1" }}
      >
        <Board board={board} turn={turn} />
      </div>
    </div>
  );
};

export default App;
