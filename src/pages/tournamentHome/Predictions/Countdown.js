import React from "react";
import moment from "moment";
import Countdown from "react-countdown";

const CustomCountdown = ({ dates, order }) => {
  const isValidDate = moment(
    dates[order],
    "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
  ).isValid();

  if (!isValidDate) {
    return <div>Invalid date format</div>;
  }

  const now = new Date();
  const time =
    Math.floor((dates[order].getTime() - now.getTime()) / 1000) * 1000;

  return (
    <Countdown
      date={dates[order].getTime()}
      renderer={({ days, hours, minutes, seconds }) => (
        <div>
          {days > 0 && `${days} days, `}
          {hours > 0 && `${hours} hours, `}
          {minutes > 0 && `${minutes} minutes, `}
          {`${seconds} seconds`}
        </div>
      )}
    />
  );
};

export default CustomCountdown;
