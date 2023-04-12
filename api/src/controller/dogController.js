const axios = require("axios");
const { Dog } = require("../db");
const { Temperaments } = require("../db");
const { API_KEY } = process.env;

const dogApi = async () => {
  let apiUrl = await axios(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );

  let dataApi = await apiUrl.data.map((i) => {
    let minWeight = parseInt(i.weight.metric.slice(0, 2).trim());
    let maxWeight = parseInt(i.weight.metric.slice(4).trim());
    let averageWeight = maxWeight + minWeight;

    if (minWeight && maxWeight) {
      averageWeight = averageWeight / 2;
    } else if (minWeight && !maxWeight) {
      maxWeight = minWeight;
      averageWeight = averageWeight / 2;
    } else if (!minWeight && maxWeight) {
      minWeight = maxWeight;
      averageWeight = averageWeight / 2;
    }

    return {
      id: i.id,
      name: i.name,
      img: i.image.url,
      height: i.height,
      minWeight: minWeight,
      maxWeight: maxWeight,
      averageWeight: averageWeight,
      life_span: i.life_span,
      temperament: i.temperament,
    };
  });
  return dataApi;
};

// dogApi es una funcion que me trae toda la informacion de la API que necesito de los perros.

const dogDb = async () => {
  let dataDb = await Dog.findAll({
    include: [
      {
        model: Temperaments,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  let databaseDog = dataDb.map((i) => {
    return {
      id: i.id,
      name: i.name,
      img: i.image,
      height: i.height,
      minWeight: i.minWeight,
      maxWeight: i.maxWeight,
      averageWeight: (Number(i.maxWeight) + Number(i.minWeight)) / 2,
      life_span: i.life_span,
      temperament: i.Temperaments
        ? i.Temperaments.map((e) => e.name).join(", ")
        : "Happy",
      fromDb: true,
    };
  });
  return databaseDog;
};

// dogDb es una funcion que me trae toda la data de la base de datos que creamos.

const getDogs = async () => {
  let apiDogs = await dogApi();
  let dbDogs = await dogDb();
  let allDogs = dbDogs ? [...apiDogs, ...dbDogs] : apiDogs;
  return allDogs;
};

// getDogs es una funcion que me trae todo lo que tengo en la api y la base de datos y lo unifica.

const dogByName = async (name) => {
  let dogs = await getDogs();
  let result = await dogs.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase())
  );

  if (result.length) {
    return result;
  } else {
    throw new Error("This dog doesn't exist.");
  }
};

// dogByName es una funcion que solo nos traera lo que nosotros le pidamos de nombre, en caso de no existir nos saldra un error.

const dogById = async (id, source) => {
  try {
    if (source === "db") {
      let dbId = await Dog.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Temperaments,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (dbId) {
        return {
          id: dbId.id,
          name: dbId.name,
          img: dbId.image,
          height: dbId.height,
          minWeight: dbId.minWeight,
          maxWeight: dbId.maxWeight,
          averageWeight: (Number(dbId.maxWeight) + Number(dbId.minWeight)) / 2,
          life_span: dbId.life_span,
          temperament: dbId.Temperaments
            ? dbId.Temperaments.map((e) => e.name).join(", ")
            : "Happy",
          fromDb: true,
        };
      }
    } else {
      let result = await axios(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      let doggy = result.data.find((e) => e.id === Number(id));
      let minWeight = parseInt(doggy.weight.metric.slice(0, 2).trim());
      let maxWeight = parseInt(doggy.weight.metric.slice(4).trim());
      let averageWeight = maxWeight + minWeight;

      if (minWeight && maxWeight) {
        averageWeight = averageWeight / 2;
      } else if (minWeight && !maxWeight) {
        maxWeight = minWeight;
        averageWeight = averageWeight / 2;
      } else if (!minWeight && maxWeight) {
        minWeight = maxWeight;
        averageWeight = averageWeight / 2;
      }

      let dogIdApi = {
        id: doggy.id,
        name: doggy.name,
        img: doggy.image.url,
        height: doggy.height.metric,
        minWeight: minWeight,
        maxWeight: maxWeight,
        averageWeight: averageWeight,
        life_span: doggy.life_span,
        temperament: doggy.temperament,
      };
      return dogIdApi;
    }
  } catch (error) {
    return { error: "The dog with the require id doesnt exist" };
  }
};

// dogById es una funcion que nos trae el perro que busquemos por su id, en caso de no haber uno, nos saldra un error.
// primero busca en la base de datos, si no hay ninguno ahi dentro, busca en la api y lo trae.

const createDog = async (
  name,
  img,
  height,
  minWeight,
  maxWeight,
  life_span,
  temperament,
  fromDb
) => {
  if (
    !name ||
    !img ||
    !height ||
    !minWeight ||
    !maxWeight ||
    !life_span ||
    !temperament
  ) {
    throw new Error("Information is missing, please check your data.");
  } else {
    let newDog = await Dog.create({
      name: name,
      img: img,
      height: height,
      minWeight: minWeight,
      maxWeight: maxWeight,
      averageWeight: (maxWeight + minWeight) / 2,
      life_span: life_span,
    });
    let nature = await Temperaments.findAll({
      where: {
        name: temperament,
      },
    });
    await newDog.addTemperament(nature);
  }
};

module.exports = {
  getDogs,
  dogByName,
  dogById,
  createDog,
};
