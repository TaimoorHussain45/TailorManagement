export const getFormattedDate = (date: any) => {
  const day = date.toLocaleDateString("en-US", { weekday: "long" }); // "Tuesday"
  const dayNum = date.getDate().toString().padStart(2, "0"); // "08"
  const month = date.toLocaleDateString("en-US", { month: "long" }); // "October"
  return `${day}, ${dayNum} ${month}`;
};
export const getGreeting = (date: any) => {
  const hour = date.getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 17) {
    return "Good Afternoon";
  } else if (hour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};
