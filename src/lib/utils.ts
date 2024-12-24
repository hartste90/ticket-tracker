import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWeekdayFromDate(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "long" }).substring(0, 3);
}

export function formatMonthFromDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long" });
}
