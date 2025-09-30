// src/utils/date.js
export const getWeekRange = () => {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday
  const diffToMonday = (day === 0 ? -6 : 1) - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 6 - 2); // Monday + 4 = Friday

  const format = (d) =>
    d.toLocaleDateString("en-GB").replace(/\//g, "/"); // DD/MM/YYYY

  return `${format(monday)}-${format(friday)}`;
};


export function getTodayKey() {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date();
  return days[today.getDay()]; // e.g. "monday"
}