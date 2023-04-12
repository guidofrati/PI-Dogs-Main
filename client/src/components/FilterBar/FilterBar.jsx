import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterOrigin,
  filterTemp,
  getDogs,
  getTemperaments,
  orderByWeight,
  orderName,
  setPage,
} from "../../redux/actions/actions";
import styles from "./FilterBar.module.css";

const FilterBar = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    origin: "All",
    temperaments: "All",
    name: "name",
    weight: "weight",
  });

  const temperaments = useSelector((state) => {
    return state.temperaments;
  });

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
    dispatch(getTemperaments());
    setPage(1);
    setFilter({
      origin: "All",
      temperaments: "All",
      name: "name",
      weight: "weight",
    });
  };

  const handleAscDesc = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let print = orderName(e.target.value);
    console.log(print);
    dispatch(orderName(e.target.value));
    setPage(1);
    setFilter({ ...filter, name: e.target.value });
    //setOrder(e.target.value);
  };

  const handleOrigin = (e) => {
    dispatch(filterOrigin(e.target.value));
    setPage(1);
    setFilter({ ...filter, origin: e.target.value });
  };

  const handleWeight = (e) => {
    dispatch(orderByWeight(e.target.value));
    setPage(1);
    setFilter({ ...filter, weight: e.target.value });
    //setOrder(e.target.value);
  };

  const handleTemps = (e) => {
    if (e.target.value === "All") {
      dispatch(getDogs());
    }
    dispatch(filterTemp(e.target.value));
    setPage(1);
    setFilter({ ...filter, temperaments: e.target.value });
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <h4>Alphabetic order</h4>
        <select value={filter.name} onChange={(e) => handleAscDesc(e)}>
          <option value="Asc">Asc</option>
          <option value="Desc">Desc</option>
        </select>
      </div>

      <div>
        <h4>Origin of dogs</h4>
        <select value={filter.origin} onChange={(e) => handleOrigin(e)}>
          <option value="All">All dogs</option>
          <option value="Db">Created</option>
          <option value="Api">Api dogs</option>
        </select>
      </div>

      <div>
        <h4>Temperaments</h4>
        <select value={filter.temperaments} onChange={(e) => handleTemps(e)}>
          <option value="All">All</option>
          {temperaments.map((e) => {
            return (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <h4>Weight</h4>
        <select value={filter.weight} onChange={(e) => handleWeight(e)}>
          <option value="all">All</option>
          <option value="max">Max to min</option>
          <option value="min">Min to max</option>
        </select>
      </div>

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Restart filters
      </button>
    </div>
  );
};

export default FilterBar;
