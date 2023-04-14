import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import Countdown from "react-countdown";

const CustomCountdown = ({
  dates,
  order,
  setDisableScoreInputs,
  setTimeRemaining,
  setTimeUp,
}) => {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const handleTimeUp = () => {
    setDisableScoreInputs(true);
    setTimeUp(true);
  };

  useEffect(() => {
    if (dates.length && dates[order]) {
      const eventTimeInMillis = dates[order].getTime();
      const nowInMillis = new Date().getTime();
      const timeDiffInMillis = eventTimeInMillis - nowInMillis;
      setTimeRemaining(timeDiffInMillis);
    }
  }, [dates, order]);

  useEffect(() => {
    const twoHoursInMillis = 2 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        const newTimeRemaining = prevTimeRemaining - 1000;

        if (newTimeRemaining <= twoHoursInMillis && !isTimeUp) {
          handleTimeUp();
          setIsTimeUp(true); // establecer el estado isTimeUp en true
        }

        return newTimeRemaining;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimeRemaining, isTimeUp]);

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
