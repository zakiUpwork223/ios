export function formatDateString(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const regExp1 = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const regExp2 = /^(\d{4})-(\d{2})-(\d{2})$/;
  const regExp3 = /^(\d{4})(\d{2})(\d{2})$/;

  if (regExp1.test(date)) {
    const [, day, month, year] = date.match(regExp1);
    return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)} ${year}`;
  }

  if (regExp2.test(date)) {
    const [, year, month, day] = date.match(regExp2);
    return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)} ${year}`;
  }

  if (regExp3.test(date)) {
    const [, year, month, day] = date.match(regExp3);
    return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)} ${year}`;
  } else {
    return date;
  }
}