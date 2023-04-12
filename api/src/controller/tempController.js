const axios = require("axios");
const { Temperaments } = require("../db");
const { API_KEY } = process.env;

const tempsFromApi = async () => {
  const allTemps = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );

  allTemps.data.forEach((e) => {
    if (e.temperament) {
      let temps = e.temperament.split(", ");

      temps.forEach((e) => {
        Temperaments.findOrCreate({
          where: { name: e },
        });
      });
    }
  });
  const searchTemp = await Temperaments.findAll();
  return searchTemp;
};

module.exports = {
  tempsFromApi,
};
