import * as Chess from "chess.js";
import { BehaviorSubject } from "rxjs";

const chess = new Chess();

export const gameSubject = new BehaviorSubject();

export const initGame = () => {
  const savedGame = JSON.parse(localStorage.getItem("savedGame"));
  if (savedGame) {
    chess.load(savedGame);
  }
  updateGame();
};

export const resetGame = () => {
  chess.reset();
  updateGame();
};

export const handleMove = (from, to) => {
  const promotions = chess
    .moves({ verbose: true })
    .filter((move) => move.promotion);

  if (
    promotions.some((prom) => `${prom.from}:${prom.to}` === `${from}:${to}`)
  ) {
    const pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }
  const { pendingPromotion } = gameSubject.getValue();

  if (!pendingPromotion) {
    move(from, to);
  }
};

export const move = (from, to, promotion) => {
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  const isMoveAllowed = chess.move(tempMove);

  if (isMoveAllowed) {
    updateGame();
  }
};

const gameResult = () => {
  if (chess.in_checkmate()) {
    const winner = chess.turn() === "w" ? "black" : "white";
    return `Checkmate. ${winner} wins`;
  }
  if (chess.in_draw()) {
    let draw = "50 - Moves - Rule";
    if (chess.in_staleMate()) {
      draw = "Stalemate";
    } else if (chess.in_threefold_repetition()) {
      draw = "Repetition";
    } else if (chess.insufficientMaterial()) {
      draw = "Insufficient Material";
    }
    return `Draw: ${draw}`;
  } else {
    return `Unknown`;
  }
};

const updateGame = (pendingPromotion) => {
  const isGameOver = chess.game_over();

  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    result: isGameOver ? gameResult() : null,
    turn: chess.turn(),
  };
  localStorage.setItem("savedGame", JSON.stringify(chess.fen()));
  gameSubject.next(newGame);
};
