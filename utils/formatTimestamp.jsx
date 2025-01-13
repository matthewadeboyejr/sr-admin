export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    //second: "2-digit",
    //timeZoneName: "short",
  };

  return date.toLocaleString(undefined, options);
}
