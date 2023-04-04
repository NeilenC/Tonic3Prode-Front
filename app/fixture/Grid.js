'use client';

// import React from "react";
// import { Box } from "@mui/material";
// import MatchCard from "@/commons/MatchCard";
// import styles from "../../styles/matches/Grid.module.css";
// import matches from "../../fakeData/matches";
// import weekDays from "../../fakeData/weekDays";

// const Grid = () => {
//   const matchesByDate = matches.reduce((accumulator, current) => {
//     if (!accumulator[current.date]) {
//       accumulator[current.date] = [];
//     }
//     accumulator[current.date].push(current);
//     return accumulator;
//   }, {});

//   return (
//     <Box className={styles["grid-box"]}>
//     {Object.entries(matchesByDate).map(([date, matches]) => {
//       const dateObj = new Date(date);
//       const dayOfWeek = weekDays.es[dateObj.getDay()]; // cambiar "es" a "en" o "pt" para obtener el nombre del día en otros idiomas
//       const dayOfMonth = dateObj.getDate();
//       const month = dateObj.getMonth() + 1;
//       return (
//         <div key={date} className={styles.dateContainer}>
//           <Box className={styles.dateBox}>
//             <div className={styles.title}>
//               <h3 className={styles["title-date"]}>
//                 {dayOfWeek} {dayOfMonth}/{month}
//               </h3>
//             </div>
//             {matches.map((match, i) => (
//               <MatchCard
//                 key={i}
//                 time={match.time}
//                 homeTeam={match.homeTeam}
//                 awayTeam={match.awayTeam}
//               />
//             ))}
//           </Box>
//         </div>
//       );
//     })}
//   </Box>
// );
// };

// export default Grid;

