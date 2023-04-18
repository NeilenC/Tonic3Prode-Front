import React, { useState } from "react";
import SearchCamp  from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import UserCard from "@/commons/UserCard";
import { useIntl } from "react-intl";
import UserProvider from "../../../redux/UserProvider";

const Search = ({ranking }) => {
  const [searchResults, setSearchResults] = useState("");
  const intl = useIntl()

  const handleBusqueda = (event) => {
    setSearchResults(event.target.value);
  };


  return (
    <Box style={{ marginTop: "30px" }}>
      <Box style={{ display: "flex", alignItems: "center"}}>
      </Box>
      <Box style={{marginTop : "35px"}}>
      {ranking.map((user, index) => (
        <UserCard user={user} index={index} />
      ))}
      </Box>
    </Box>
  );
};

export default Search;
