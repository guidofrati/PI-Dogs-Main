import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({
  id,
  name,
  image,
  temperament,
  maxWeight,
  minWeight,
  height,
  life_span,
}) {
  return (
    <div className={styles.card}>
      <div>
        <img
          src={image ? image : (image = "../../images/logo.png")}
          alt="img"
          width="250"
          height="250"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <Link to={`/detail/${id}`}>
            <h2>{name}</h2>
          </Link>
        </div>
        <h4>
          Temperaments: <p className={styles.info}>{temperament}</p>{" "}
        </h4>
        <h4>
          Weight:{" "}
          <p className={styles.info}>
            Min {minWeight} kg | Max {maxWeight} kg
          </p>
        </h4>
        <h4>
          Life span: <p className={styles.info}>{life_span}</p>
        </h4>
      </div>
    </div>
  );
}
