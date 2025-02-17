import { Frequency } from "@/lib/enums";

export const mapPathToRouteName = (pathName: string, route: string) => {
  return pathName.toLowerCase().includes(route);
};

export function formatDate(date: string | Date) {
  date = typeof date == "object" ? date : new Date(date);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatAmount(num: number) {
  num = parseFloat(num.toString());
  return parseFloat(num.toFixed(2));
}

export function calculateNextOcc(frequency: string) {
  const nextOcurrenceDate = new Date();
  switch (frequency) {
    case Frequency.daily:
      nextOcurrenceDate.setDate(nextOcurrenceDate.getDate() + 1);
      break;
    case Frequency.weekly:
      nextOcurrenceDate.setDate(nextOcurrenceDate.getDate() + 7);
      break;
    case Frequency.monthly:
      nextOcurrenceDate.setMonth(nextOcurrenceDate.getMonth() + 1);
      break;
    case Frequency.yearly:
      nextOcurrenceDate.setFullYear(nextOcurrenceDate.getFullYear() + 1);
      break;
  }
  return nextOcurrenceDate;
}
