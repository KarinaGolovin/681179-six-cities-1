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

// TODO word ending check
