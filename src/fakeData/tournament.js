import teamsTournament from "./teams";
import matchesTournament from "./matches";
import stadiumsTournament from "./stadiums";

const tournament = 
  {
    active: true,
    beggining: "2023/01/24",
    ending: "2023/12/31",
    title: "Copa Argentina",
    details:
      "La Copa Argentina es un torneo de fútbol que se disputa anualmente en Argentina. El objetivo del torneo es determinar al campeón del fútbol argentino de la temporada, otorgándole al ganador un cupo en la Copa Libertadores de América, el torneo más prestigioso de clubes en Sudamérica.",
    type: "tree",
    stage: "32",
    teams: teamsTournament,
    matches: matchesTournament,
    stadiums: stadiumsTournament
  };

module.exports = tournament