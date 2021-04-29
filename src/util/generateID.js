/**
 * generates random 10 character string
 */
const generateID = () =>
  Math.random()
    .toString(36)
    .substring(2, 15);

export default generateID;
