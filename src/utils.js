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

// TODO pluralization

// TODO toCamelCase
