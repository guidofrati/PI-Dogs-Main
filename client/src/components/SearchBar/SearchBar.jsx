import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../../redux/actions/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogsName(name));
    setName("");
  };

  return (
    <div>
      <form>
        <input
          onChange={(e) => handleInputChange(e)}
          value={name}
          placeholder="Search dog..."
          className={styles.marco}
        />
        <button
          className={styles.btn}
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          Search dog
        </button>
      </form>
    </div>
  );
}
