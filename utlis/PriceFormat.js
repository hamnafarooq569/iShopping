export const formatPrice = (price) => {
  if (!price && price !== 0) return "";

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 2,
  }).format(price);
};