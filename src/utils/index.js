const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime(); //return diff in milisecond

  difference = difference / 1000;
  let hourDif = Math.floor(difference / 3600);

  difference -= hourDif * 1000;
  let minDif = Math.floor(difference / 60);
  difference -= minDif * 60;

  let dayDif = Math.floor(hourDif / 24);
  hourDif -= dayDif * 24;



  let message;
  if (hourDif > 0) {
    `${hourDif} hour`;
  }

  if (minDif > 0) {
    message = message ? `${message} ${minDif} minutes ago` : `${message} ${minDif} ago`;
  }

  if (dayDif > 0 && dayDif <= 7) {
    message = `${dayDif} days ago`;
  }else{
    message = new Date(fromDate).toLocaleDateString();
  }
  return message;
};

export { getDateDifferenceFromNow };
