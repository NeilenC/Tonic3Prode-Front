import React from "react";
import moment from "moment";

const Countdown = ({ dates, order }) => {
   console.log("DATE STRING", dates[order]);
  const isValidDate = moment(
    dates[order],
    "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
  ).isValid();

  if (!isValidDate) {
    return <div>Invalid date format</div>;
  }

  const seconds = [];
  dates.map((date) => {
    const now = new Date();
    const time = Math.floor((dates[order].getTime() - now.getTime()) / 1000);
    seconds.push(time);
  });

  const duration = moment.duration(seconds[order], "seconds");
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const sec = duration.seconds();

  const formattedDuration =
    (days > 0 ? days + " days, " : "") +
    (hours > 0 ? hours + " hours, " : "") +
    (minutes > 0 ? minutes + " minutes, " : "") +
    sec +
    " seconds";

  return <div>{formattedDuration}</div>;
};

export default Countdown;
