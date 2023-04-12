import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogsDetail, resetDetails } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./CardDetail.module.css";

const CardDetail = () => {
  let dispatch = useDispatch();
  let { id } = useParams();

  const dogsDetail = useSelector((state) => state.dogsDetail);

  useEffect(() => {
    dispatch(getDogsDetail(id));
    return dispatch(resetDetails());
  }, [dispatch, id]);

  return (
    <div>
      <NavBar />
      <Link to="/home" className={styles.btn}>
        <button>Go back!</button>
      </Link>

      {Object.keys(dogsDetail).length ? (
        <div>
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.imagen}>
                <img src={dogsDetail?.img} alt="dog" />
              </div>
              <div className={styles.detail}>
                <h3>
                  Id: <p className={styles.info}>{dogsDetail?.id}</p>
                </h3>
                <h3>
                  Breed: <p className={styles.info}>{dogsDetail?.name}</p>
                </h3>
                <h3>
                  Height: <p className={styles.info}>{dogsDetail?.height} cm</p>
                </h3>
                <h3>
                  Min Weight:{" "}
                  <p className={styles.info}>{dogsDetail?.minWeight} kg</p>
                </h3>
                <h3>
                  Max Weight:{" "}
                  <p className={styles.info}>{dogsDetail?.maxWeight} kg</p>
                </h3>
                <h3>
                  Average Weight:{" "}
                  <p className={styles.info}>{dogsDetail?.averageWeight} kg</p>
                </h3>
                <h3>
                  Temperament:{" "}
                  <p className={styles.info}>{dogsDetail?.temperament}</p>
                </h3>
                <h3>
                  Life span:{" "}
                  <p className={styles.info}>{dogsDetail?.life_span}</p>
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading, please wait...</h1>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
