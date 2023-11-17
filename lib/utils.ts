import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

interface removeUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else if (weeks > 0) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "Just now";
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

export function getJoinedDate(date: Date): string {
  const month = date.toLocaleString("en-us", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: removeUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level as keyof BadgeCounts]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });


  return badgeCounts
};
