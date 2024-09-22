export const timeAgo = (date: Date): string => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const MINUTE = 60;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  if (secondsAgo < MINUTE) {
    return `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""} ago`;
  } else if (secondsAgo < HOUR) {
    const minutesAgo = Math.floor(secondsAgo / MINUTE);
    return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
  } else if (secondsAgo < DAY) {
    const hoursAgo = Math.floor(secondsAgo / HOUR);
    return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
  } else if (secondsAgo < WEEK) {
    const daysAgo = Math.floor(secondsAgo / DAY);
    return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
  } else if (secondsAgo < MONTH) {
    const weeksAgo = Math.floor(secondsAgo / WEEK);
    return `${weeksAgo} week${weeksAgo !== 1 ? "s" : ""} ago`;
  } else if (secondsAgo < YEAR) {
    const monthsAgo = Math.floor(secondsAgo / MONTH);
    return `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / YEAR);
    return `${yearsAgo} year${yearsAgo !== 1 ? "s" : ""} ago`;
  }
};

export const getRandomName = (): string => {
  const names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eve'];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};
