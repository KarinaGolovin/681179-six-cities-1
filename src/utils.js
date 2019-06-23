export const rand = (min, max) => {
  return min + Math.floor((max - min + 1) * Math.random());
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: `long`,
    year: `numeric`,
  };

  return date.toLocaleDateString(`en-GB`, options);
};

export const shuffleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    let number = Math.floor(Math.random() * (i + 1));
    let firstNumber = newArray[number];
    newArray[number] = newArray[i];
    newArray[i] = firstNumber;
  }
  return newArray;
};

export const capitalizeFirstLetter = (string) => {
  if (!string.length) {
    return null;
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const ratingInPercents = (rating, max = 5) => {
  return Math.round(rating) / max * 100;
};

export const snakeCaseToCamelCase = (obj) => {
  const toCamel = (s) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
      .replace(`-`, ``)
      .replace(`_`, ``);
    });
  };

  const transformObjectKeys = (val, handler = (v) => v) => {
    if (!val || typeof val !== `object`) {
      return val;
    }

    if (Array.isArray(val)) {
      return val.map((v) => transformObjectKeys(v, handler));
    }

    const newObj = {};
    Object.keys(val).forEach((key) => {
      newObj[handler(key)] = transformObjectKeys(val[key], handler);
    });

    return newObj;
  };

  return transformObjectKeys(obj, (key) => toCamel(key));
};

// TODO pluralization
