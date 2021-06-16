import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import IMAGES from "../../constants/images";

const Piece = ({ piece: { type, color }, position }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "piece",
    item: { id: `${type}_${color}`, position },
    previewOptions: { anchorX: 0.5, anchorY: 0.5 },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <>
      <DragPreviewImage connect={preview} src={IMAGES[`${type}_${color}`]} />
      <div
        style={{ cursor: "grab", opacity: isDragging ? "0.3" : "1" }}
        ref={drag}
      >
        <img
          src={IMAGES[`${type}_${color}`]}
          alt={`${type}_${color}`}
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};

export default Piece;
