export const capitalize = (text: string) => {
  const textCapitalized = text.charAt(0).toUpperCase() + text.slice(1);
  console.log({ textCapitalized });

  return textCapitalized;
};
