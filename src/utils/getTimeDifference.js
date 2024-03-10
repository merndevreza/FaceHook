const getTimeDifference = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();

  difference /= 1000;
  let months = Math.floor(difference / (30 * 24 * 3600));
  difference -= months * 30 * 24 * 3600;
  let days = Math.floor(difference / (24 * 3600));
  difference -= days * 24 * 3600;
  let hours = Math.floor(difference / 3600);
  difference -= hours * 3600;
  let minutes = Math.floor(difference / 60);
  difference -= minutes * 60;
  if (months > 0) {
    return months;
  } else if (months < 1 && days > 0) {
    return `${days} days`;
  } else if (months < 1 && days < 1 && hours > 0) {
    return `${hours} hours`;
  } else if (months < 1 && days < 1 && hours < 1 && minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${difference} seconds`;
  }
};

export default getTimeDifference;
