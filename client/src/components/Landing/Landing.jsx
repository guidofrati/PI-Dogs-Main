import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.back}>
      <div className={styles.box}>
        <h1>Welcome to the dog's tavern</h1>
        <Link to="/home">
          <button>Enter</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
