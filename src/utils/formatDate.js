export function formatDate(isoString) {
  const date = new Date(isoString);

  // Extracting date components
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" }); // Full month name
  const day = date.getDate();

  // Creating the pretty date string
  const prettyDate = `${month} ${day}, ${year}`;

  return prettyDate;
}
