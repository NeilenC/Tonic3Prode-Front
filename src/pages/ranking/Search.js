import React, { useState } from "react";
import SearchCamp  from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import UserCard from "@/commons/UserCard";

const Search = () => {
  const [searchResults, setSearchResults] = useState("");

  const handleBusqueda = (event) => {
    setSearchResults(event.target.value);
  };

  const users = [
    { userName: "Jenny", rank: 4, status: "advance", points: 123},
    { userName: "Pablo", rank: 5, status: "retrograde", points: 123 },
    { userName: "Alice", rank: 6, status: "none", points: 123 },
    { userName: "David", rank: 7, status: "advance", points: 123 },
    { userName: "Oliver", rank: 8, status: "advance", points: 123 },
    { userName: "Emma", rank: 9, status: "none", points: 123 },
    { userName: "Sophia", rank: 10, status: "retrograde", points: 123 },
    { userName: "Ava", rank: 11, status: "advance", points: 123 },
    { userName: "Liam", rank: 12, status: "none", points: 123 },
    { userName: "Noah", rank: 13, status: "retrograde", points: 123 },
  ];

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchResults.toLowerCase())
  );

  return (
    <Box style={{ marginTop: "30px" }}>
      <Box style={{ display: "flex", alignItems: "center"}}>
        <SearchCamp style={{ marginRight: "20px", marginLeft: "20px"  }} />
        <input
          id="userSearch"
          label="Search"
          variant="outlined"
          placeholder="Search User"
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
      {filteredUsers.map((user, index) => (
        <UserCard user={user} key={index} />
      ))}
      </Box>
    </Box>
  );
};

export default Search;
