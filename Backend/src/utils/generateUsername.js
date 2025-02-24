export const generateUsername = (
  firstName,
  lastName
) => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
  return `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNum}`;
};