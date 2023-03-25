
import { Box } from "@mui/system";
import React from "react";
import RankingPodium from "./RankingPodium";
import RankingSearch from "./RankingSearch";

const index = () => {
  return (
    <div>
      <RankingPodium />
      <Box>
        <RankingSearch />
      </Box>
    </div>
  );
};

export default index;
