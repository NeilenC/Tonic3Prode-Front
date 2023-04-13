import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { Box } from "@mui/material";
import MatchCard from "@/commons/MatchCard";
import styles from "../styles/matches/Grid.module.css";
import { matches } from "../fakeData/matches";
import weekDays from "../fakeData/weekDays";

export default function Slider() {
  const carouselProps = {
    animation: "slide",
    autoPlay: false

  };

  const sortedMatches = matches.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const matchesByDate = sortedMatches.reduce((accumulator, current) => {
    if (!accumulator[current.date]) {
      accumulator[current.date] = [];
    }
    accumulator[current.date].push(current);
    return accumulator;
  }, {});

  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column"}}>
        <Carousel {...carouselProps}>
          {Object.entries(matchesByDate).map(([date, matches]) => {
            const dateObj = new Date(date);
            const dayOfWeek = weekDays.es[dateObj.getDay()]; // cambiar "es" a "en" o "pt" para obtener el nombre del día en otros idiomas
            const dayOfMonth = dateObj.getDate();
            const month = dateObj.getMonth() + 1;
            return (
              <div key={date} className={styles.dateContainer}>
                <Box className={styles.dateBox} >
                  <div className={styles.title}>
                    <h3  className={styles["title-date"]}
                    style={{ backgroundColor: "white" }}>
                      {dayOfWeek} {dayOfMonth}/{month}
                    </h3>
                  </div>
                  {matches.map((match, i) => (
                    <MatchCard
                      key={i}
                      time={match.time}
                      homeTeam={match.homeTeam}
                      awayTeam={match.awayTeam}
                    />
                  ))}
                </Box>
              </div>
            );
          })}
        </Carousel>
      </Box>
    </>
  );
}
