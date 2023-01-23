export const containsEmptyString = (obj) => {
  return Object.values(obj).some((val) => val === "");
};

export const validateInput = (obj) => {
  return !containsEmptyString(obj);
};
