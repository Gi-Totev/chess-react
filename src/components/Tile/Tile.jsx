import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Piece from "../Piece/Piece";
import Square from "../Square/Square";
import { handleMove, gameSubject } from "../../game";
import Promote from "../Promote/Promote";

const Tile = ({ piece, tileColor, position }) => {
  const [promotion, setPromotion] = useState(null);
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => handleMove(item.position, position),
  });

  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => {
      if (game && game.pendingPromotion) {
        const { pendingPromotion } = game;
        pendingPromotion && pendingPromotion.to === position
          ? setPromotion(pendingPromotion)
          : setPromotion(null);
      }
    });

    return () => subscribe.unsubscribe();
  }, [position]);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={drop}>
      <Square color={tileColor}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  );
};

export default Tile;
