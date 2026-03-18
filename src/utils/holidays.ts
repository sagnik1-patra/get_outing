// Mock Indian holidays for 2026
export const indianHolidays2026 = [
  '2026-01-01', // New Year
  '2026-01-26', // Republic Day
  '2026-03-03', // Maha Shivaratri
  '2026-03-23', // Holi
  '2026-08-15', // Independence Day
  '2026-10-02', // Gandhi Jayanti
  '2026-10-31', // Diwali
  '2026-12-25', // Christmas
];

export const isHoliday = (dateString: string) => {
  return indianHolidays2026.includes(dateString);
};
