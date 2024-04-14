export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-la", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: string | number) => {
  // Convert to string, handle null/undefined, and remove non-numeric characters
  const numString = (value || "").toString().replace(/[^0-9]/g, "");

  // Add thousands separators
  return numString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
