const {
  getDogs,
  dogByName,
  dogById,
  createDog,
} = require("../controller/dogController");

const dogHandlers = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      let dogs = await getDogs();
      return res.status(200).json(dogs);
    } else {
      let dogName = await dogByName(name);
      return res.status(200).json(dogName);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const dogId = async (req, res) => {
  const { id } = req.params;
  let origin = isNaN(id) ? "db" : "api";

  try {
    let total = await dogById(id, origin);

    if (total.error) throw new Error(total.error);

    res.status(200).json(total);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createDogHandler = async (req, res) => {
  let {
    name,
    img,
    height,
    minWeight,
    maxWeight,
    life_span,
    temperament,
    fromDb,
  } = req.body;
  try {
    await createDog(
      name,
      img,
      height,
      minWeight,
      maxWeight,
      life_span,
      temperament
    );
    res.status(201).send("Dog was created successfully!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  dogHandlers,
  dogId,
  createDogHandler,
};
