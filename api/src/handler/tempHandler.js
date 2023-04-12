const { tempsFromApi } = require("../controller/tempController");

const tempHandlers = async (req, res) => {
  try {
    let total = await tempsFromApi();
    await res.status(200).json(total);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  tempHandlers,
};
