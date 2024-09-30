export const filterArrayById = (array, id) => {
  // Get the row of the selected id
  const result = array?.filter((element) => element.id === id)[0];

  return result; // Object returned
};
