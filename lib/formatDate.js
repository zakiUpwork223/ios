export function formatDate(dateString) {
  let strdate = "";

  if (typeof dateString === "number") {
    strdate = dateString.toString();
  } else {
    strdate = dateString;
  }

  // Extract year, month, and day
  const year = strdate.slice(0, 4);
  const month = strdate.slice(4, 6);
  const day = strdate.slice(6, 8);

  // Convert the month number into the corresponding abbreviated month name
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Parse the month and day to remove any leading zeros
  const formattedMonth = months[parseInt(month, 10) - 1]; // Month is 1-indexed
  const formattedDay = parseInt(day, 10); // Convert day to a number to avoid leading zeros

  // Format the final date string
  const formattedDate = `${formattedMonth} ${formattedDay}, ${year}`;
  
  return formattedDate;
}
