function formatReadableDate (date) {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('en-us', {
    timeZone: 'UTC',
    weekday: 'short',
    year: 'numberic',
    month: 'long',
    day: 'numberic'
  });
}

export default formatReadableDate;
