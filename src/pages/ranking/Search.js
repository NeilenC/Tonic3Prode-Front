import React, { useState } from "react";
import SearchCamp  from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import UserCard from "@/commons/UserCard";
import { useIntl } from "react-intl";
import UserProvider from "../../../redux/UserProvider";

const Search = ({ranking}) => {
  const [searchResults, setSearchResults] = useState("");
const intl = useIntl()

  const handleBusqueda = (event) => {
    setSearchResults(event.target.value);
  };


  return (
    <Box style={{ marginTop: "30px" }}>
      <Box style={{ display: "flex", alignItems: "center"}}>
        <SearchCamp style={{ marginRight: "20px", marginLeft: "20px"  }} />
        <input
          id="userSearch"
          label="Search"
          variant="outlined"
          placeholder= {intl.formatMessage({ id: "search" })}

          value={searchResults}
          onChange={handleBusqueda}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            width: "100%",
            marginRight: "30px",
            fontSize: "1rem",
            height: "25px",
          }}
        />
      </Box>
      <Box style={{marginTop : "35px"}}>
      {ranking.map((user, index) => (
        <UserCard user={user} key={index} />
      ))}
      </Box>
    </Box>
  );
};

export default Search;
