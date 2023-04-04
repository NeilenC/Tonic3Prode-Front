
import { Box } from "@mui/system";
import React from "react";
import RankingPodium from "./Podium";
import RankingSearch from "./Search";

const index = () => {
  return (
    <div>
      <RankingPodium />
      <Box sx={{display: "flex", justifyContent: "center",
  alignItems: "center"}}>
        <RankingSearch />
      </Box>
    </div>
  );
};

export default index;
