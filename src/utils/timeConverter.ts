export function timeConverter(value: number, timezoneOffset: number) {
  const date = new Date((value + timezoneOffset) * 1000);
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}
