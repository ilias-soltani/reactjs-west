export const addParamToUrl = (activeParams, param, value) => {
  const params = new URLSearchParams(activeParams);

  if (value !== null && value !== undefined && value !== "") {
    // Check if the parameter already exists
    if (params.has(param)) {
      // Append the new value to the existing value with a comma separator
      const existingValue = params.get(param);
      params.set(param, `${existingValue},${value}`);
    } else {
      // Add the parameter
      params.set(param, value);
    }
  }

  return params.toString();
};

export const removeParamFromUrl = (activeParams, param) => {
  const params = new URLSearchParams(activeParams);

  // Remove the parameter
  params.delete(param);

  return params.toString();
};

export const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
};
