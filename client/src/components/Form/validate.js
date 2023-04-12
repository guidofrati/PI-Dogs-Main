let validate = (input) => {
  let errors = {};
  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png|pnj)/;
  const nombreRegex = /([0-9])+/;

  if (!input.name.trim()) {
    errors.name = "Please choose a name";
  } else if (input.name.length > 20 || input.name.length < 2) {
    errors.name = "Please choose a name between 1 and 20 characters";
  } else if (nombreRegex.test(input.name.trim())) {
    errors.name = "The name can't be numbers";
  }

  if (!input.weightMin) {
    errors.weightMin = "Please choose a minimum weight";
  } else if (!nombreRegex.test(input.weightMin.trim())) {
    errors.weightMin = "Only numbers are allowed";
  } else if (input.weightMin.trim() > 70 || input.weightMin.trim() < 1) {
    errors.weightMin =
      "Minimum weight can't be higher than maximum weight or less than 1";
  }

  if (!input.weightMax) {
    errors.weightMax = "Please choose a maximum weight";
  } else if (!nombreRegex.test(input.weightMax.trim())) {
    errors.weightMax = "Only numbers are allowed";
  } else if (input.weightMax.trim() > 71 || input.weightMax.trim() < 1) {
    errors.weightMax =
      "Maximum weight can't be higher than 100 or less than minimum weight";
  } else if (input.weightMin >= input.weightMax) {
    errors.weightMax = "Maximum weight can't be inferior or equal than minimum";
  }

  if (!input.heightMin) {
    errors.heightMin = "Please choose a minimum height";
  } else if (!nombreRegex.test(input.heightMin.trim())) {
    errors.heightMin = "Only numbers are allowed";
  } else if (input.heightMin.trim() > 70 || input.heightMin.trim() < 1) {
    errors.heightMin =
      "Minimum height can't be higher than maximum height or less than 1";
  }

  if (!input.heightMax) {
    errors.heightMax = "Please choose a maximum height";
  } else if (!nombreRegex.test(input.heightMax.trim())) {
    errors.heightMax = "Only numbers are allowed";
  } else if (input.heightMin >= input.heightMax) {
    errors.heightMax =
      "Maximum height can't be inferior or equial than minimum";
  } else if (input.heightMax.trim() > 71 || input.heightMax.trim() < 1) {
    errors.heightMax =
      "Maximum height can't be higher than 150 or less than minimum height";
  }

  if (!input.life_span) {
    errors.life_span = "Please choose an approximate life span";
  }

  if (!input.img) {
    errors.img = "Please insert an image";
  } else if (!imageRegex.test(input.img.trim())) {
    errors.img = "Please insert a valid file for image";
  }

  if (!input.temperament.length) {
    errors.temperament = "Please choose at least one temperament for the dog:D";
  }

  return errors;
};

export default validate;
