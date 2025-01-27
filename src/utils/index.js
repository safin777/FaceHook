const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime(); //return diff in milisecond

  difference = difference / 1000;
  let hourDif = Math.floor(difference / 3600);

  difference -= hourDif * 1000;
  let minDif = Math.floor(difference / 60);
  difference -= minDif * 60;

  let message;
  if (hourDif > 0) {
    `${hourDif} hour`;
  }

  if (minDif > 0) {
    message = message ? `${message} ${minDif} minutes` : `${message} ${minDif}`;
  }

  if (difference) {
    message = message
      ? `${message} ${Math.round(difference)} seconds`
      : `${Math.round(difference)} seconds`;
  }

  return message;
};

export { getDateDifferenceFromNow };
