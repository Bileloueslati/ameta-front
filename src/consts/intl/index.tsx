export const getCountryNameFromCode = (code: string) => {
  const regionName = new Intl.DisplayNames(["en"], { type: "region" });

  return regionName.of(code.toUpperCase());
};
