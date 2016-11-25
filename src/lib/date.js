function dateFormat(date, includeTime) {
  var dateString, dateOptions, timeOptions;

  // Convert the date to UTC if not already in it
  !date.includes('T') && (date += ' UTC');

  date = new Date(date);
  dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  dateString = date.toLocaleString(navigator.language, dateOptions);

  // if(includeTime) {
    timeOptions = { hour12: true, hour: 'numeric', minute: 'numeric' };
    dateString += ' at ' + date.toLocaleTimeString(navigator.language, timeOptions );
  // }

  return dateString;
}

export default dateFormat;
