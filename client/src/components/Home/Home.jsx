import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, setPage } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import FilterBar from "../FilterBar/FilterBar";
//import SearchBar from '../SearchBar/SearchBar'

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const current = useSelector((state) => state.current);
  //const [current, setCurrent] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  let firstD = 0;
  const lastD = current * dogsPerPage;
  if (current > 1) {
    firstD = lastD - dogsPerPage;
  }

  let pagesD = dogs.slice(firstD, lastD);

  // if (pagesD.length >= 8) {
  //   let primeros = pagesD.length;
  //   pagesD = dogs.slice(primeros, lastD);
  // }

  const [order, setOrder] = useState(" ");

  const paginate = (pages) => {
    dispatch(setPage(pages));
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  // useEffect(() => {
  //   const data = window.localStorage.getItem("pagesD");
  //   (JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("pagesD", JSON.stringify(current));
  // }, [current]);

  return (
    <div className={styles.background}>
      <NavBar />
      <FilterBar />
      {/* <SearchBar /> */}

      <div className={styles.container}>
        {pagesD?.map((e) => {
          return (
            <div key={e.id + "div"}>
              <Card
                name={e.name}
                image={e.img}
                temperament={e.temperament}
                id={e.id}
                maxWeight={e.maxWeight}
                minWeight={e.minWeight}
                life_span={e.life_span}
                key={e.id}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <Paginado
          dogsPerPage={dogsPerPage}
          dogs={dogs.length}
          paginado={paginate}
        />
      </div>
    </div>
  );
};

export default Home;
