function formatReadableDate (date) {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('en-us', {
    timeZone: 'UTC',
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default formatReadableDate;
