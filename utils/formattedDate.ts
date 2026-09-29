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
export const parseDueDate = (value?: string | null): Date | null => {
  if (!value || !value.trim()) return null;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

/** True if `value` parses to a date between today and `days` days from now (inclusive). */
export const isDueWithinDays = (
  value: string | null | undefined,
  days: number,
): boolean => {
  const due = parseDueDate(value);
  if (!due) return false;

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const endOfWindow = new Date(startOfToday);
  endOfWindow.setDate(endOfWindow.getDate() + days);

  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  return dueDay >= startOfToday && dueDay <= endOfWindow;
};
