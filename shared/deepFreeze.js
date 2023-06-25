// Function to freeze objects recursively
const deepFreeze = (object) => {
  // Get property names of the object
  const propertyNames = Object.getOwnPropertyNames(object);
  // For each property name,
  for (const name of propertyNames) {
    // Get the associated value
    const value = object[name];
    // If the value is an object,
    if (value && typeof value === "object") {
      // Recursively freeze the value and any nested objects
      deepFreeze(value);
    }
  }
  // Freeze and return the object
  return Object.freeze(object);
};

export default deepFreeze;
