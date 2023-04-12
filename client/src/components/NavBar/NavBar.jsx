import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { getDogs, setPage } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current);
  const handleDogs = () => {
    dispatch(getDogs());
    setPage(1);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className={styles.toplane}>
      <nav className={styles.nav}>
        <Link to="/home">
          <h1 onClick={(e) => handleDogs(e)}>Home</h1>
        </Link>
        <Link to="/form">
          <button className={styles.btn}>Create a dog!</button>
        </Link>
        <SearchBar />
      </nav>
    </div>
  );
};

export default NavBar;
