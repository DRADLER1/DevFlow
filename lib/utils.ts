import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();

  // Define the time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Calculate the time difference in different units
  const years = Math.floor(diff / year);
  const months = Math.floor(diff / month);
  const weeks = Math.floor(diff / week);
  const days = Math.floor(diff / day);
  const hours = Math.floor(diff / hour);
  const minutes = Math.floor(diff / minute);

  // Choose the appropriate unit and return the formatted string
  if (years > 0) {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else if (weeks > 0) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
};


export const formatNumber = (input: number): string => {
  if (input >= 1000000) {
    const result = (input / 1000000).toFixed(1);
    return `${result}M`;
  } else if (input >= 1000) {
    const result = (input / 1000).toFixed(1);
    return `${result}K`;
  } else {
    return `${input}`;
  }
};
