export const containsEmptyString = (obj) => {
  return Object.values(obj).some((val) => val === "");
};
