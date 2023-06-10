const calcTimeSince = (time, timeNow) => {
  const secondsAgo = Math.round((timeNow - new Date(time).getTime()) / 1000);

  let unit;
  let timeSince;
  if (secondsAgo < 60) {
    unit = "seconds";
    timeSince = secondsAgo;
  } else if (secondsAgo / 60 < 60) {
    unit = "mins";
    timeSince = secondsAgo / 60;
  } else if (secondsAgo / 3600 < 24) {
    unit = "hrs";
    timeSince = secondsAgo / 3600;
  } else {
    unit = "days";
    timeSince = secondsAgo / 86400;
  }
  timeSince = Math.round(timeSince);

  return { timeSince, unit };
};

export default calcTimeSince;
