import React from "react";
import styles from "./Paginado.module.css";
import { useSelector } from "react-redux";

export default function Paginado({ dogsPerPage, dogs, paginado }) {
  const pages = [];
  const current = useSelector((state) => state.current);

  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    pages.push(i);
  }
  console.log(current);
  return (
    <div>
      <nav>
        <ul className={styles.bottom}>
          {pages?.map((number) => (
            <li
              key={pages}
              className={current === number ? styles.itemActive : styles.item}
            >
              <button key={number} onClick={() => paginado(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
