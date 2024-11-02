import { forwardRef } from "react";
import "../pages/globals.css";

const Card = forwardRef(({ id, frontSrc, frontAlt, backText, topPosition }, ref) => {
  return (
    <div className={`card `} id={id} ref={ref}>
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src={frontSrc}
              width={500}
              height={500}
              alt={frontAlt}
              className="card-img"
            /> 
          </div>
          <div className="flip-card-back">
            <p>{backText}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
