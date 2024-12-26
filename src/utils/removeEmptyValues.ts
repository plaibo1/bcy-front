export const removeEmptyValues = (
  obj: Record<string, string | boolean | null | number | undefined> // TODO: перетипизровать!
) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null && typeof obj[key] !== "undefined") {
      if (typeof obj[key] === "string") {
        if (obj[key].trim() === "") {
          return acc;
        }

        acc[key] = obj[key].trim();
        return acc;
      }

      acc[key] = obj[key];
    }

    return acc;
  }, {} as Record<string, string | boolean | number>);
};
