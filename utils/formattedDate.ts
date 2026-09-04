export const getFormattedDate = (date: any) => {
  const day = date.toLocaleDateString("en-US", { weekday: "long" }); // "Tuesday"
  const dayNum = date.getDate().toString().padStart(2, "0"); // "08"
  const month = date.toLocaleDateString("en-US", { month: "long" }); // "October"
  return `${day}, ${dayNum} ${month}`;
};
