const IsNullOrEmpty = (value: string) => {
  return !value || value === null || value.length === 0;
};

const IsJSONDataValid = (data: any) => {
  if (
    !data.hasOwnProperty("name") ||
    !data.hasOwnProperty("age") ||
    !data.hasOwnProperty("breed") ||
    !data.hasOwnProperty("gender") ||
    IsNullOrEmpty(data.name) ||
    IsNullOrEmpty(data.breed) ||
    Number(data.age) <= 0 ||
    Number(data.gender) > 1 ||
    Number(data.gender) < 0
  ) {
    return false;
  }
  return true;
};

export { IsNullOrEmpty, IsJSONDataValid };
