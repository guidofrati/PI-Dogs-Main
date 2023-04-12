import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";
import { createDog, getTemperaments } from "../../redux/actions/actions";
import styles from "./Form.module.css";
import { Link } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    img: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(createDog());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChanges = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleTemperaments = (e) => {
    let { value } = e.target;
    if (temperaments.includes(value)) {
      return alert("Temperaments can't be repeated");
    }
    if (value === "all") {
      return;
    }
    setInput({
      ...input,
      temperament: [...input.temperament, value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDeleteTemp = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== e),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const averHeight = (Number(input.heightMax) + Number(input.heightMin)) / 2;
    const newDog = {
      name: input.name,
      minWeight: input.weightMin,
      maxWeight: input.weightMax,
      height: averHeight.toString(),
      life_span: input.life_span,
      img: input.img,
      temperament: input.temperament,
    };
    dispatch(createDog(newDog));
    alert("Dog has been created succesfully!");
    setInput({
      name: "",
      weightMin: "",
      weightMax: "",
      heightMin: "",
      heightMax: "",
      life_span: "",
      img: "",
      temperament: [],
    });
  };

  return (
    <div className={styles.back}>
      <Link to="/home">
        <button> Go back to home</button>
      </Link>

      <form className={styles.Formulario}>
        <div>
          <h1>Complete your dog!</h1>
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={input.name}
              placeholder={"example: Pepito"}
              onChange={(e) => handleChanges(e)}
            />
            {errors.name}
          </div>

          <br />

          <div>
            <label>Minimum Weight: </label>
            <input
              type="text"
              name="weightMin"
              value={input.weightMin}
              onChange={(e) => handleChanges(e)}
            />
            {errors.weightMin}
          </div>

          <br />

          <div>
            <label>Maximum Weight: </label>
            <input
              type="text"
              name="weightMax"
              value={input.weightMax}
              onChange={(e) => handleChanges(e)}
            />{" "}
            {errors.weightMax}
          </div>

          <br />

          <div>
            <label>Minimum Height: </label>
            <input
              type="text"
              name="heightMin"
              value={input.heightMin}
              onChange={(e) => handleChanges(e)}
            />{" "}
            {errors.heightMin}
          </div>

          <br />

          <div>
            <label>Maximum Height: </label>
            <input
              type="text"
              name="heightMax"
              value={input.heightMax}
              onChange={(e) => handleChanges(e)}
            />{" "}
            {errors.heightMax}
          </div>

          <br />

          <div>
            <label>Life Span: </label>
            <input
              type="text"
              name="life_span"
              value={input.life_span}
              placeholder="For example: 8 - 14 years"
              onChange={(e) => handleChanges(e)}
            />{" "}
            {errors.life_span}
          </div>

          <br />

          <div>
            <label>Image: </label>
            <input
              type="text"
              name="img"
              value={input.img}
              placeholder="https://dogos.jpg"
              onChange={(e) => handleChanges(e)}
            />{" "}
            {errors.img}
          </div>

          <br />

          <div>
            <label>Temperaments: </label>
            <select onChange={(e) => handleTemperaments(e)}>
              <option value="all"></option>
              {temperaments.map((t) => {
                return (
                  <option value={t.name} key={t.id}>
                    {t.name}
                  </option>
                );
              })}
            </select>{" "}
            {errors.temperament}
            {/* <ul>
              <div>{input.temperaments_.map((t) => t + ", ")}</div>
            </ul> */}
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={
                errors.name ||
                errors.weightMin ||
                errors.weightMax ||
                errors.heightMax ||
                errors.heightMin ||
                errors.life_span ||
                input.temperament.lenght < 1 ||
                !input.name
              }
            >
              Create dog
            </button>
            {input.temperament.map((t) => {
              return (
                <div>
                  <p>{t}</p>
                  <button
                    onClick={() => {
                      handleDeleteTemp(t);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
