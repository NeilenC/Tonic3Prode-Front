import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { Box } from "@mui/system";
import UserCard from "@/commons/UserCard";

const RankingSearch = () => {
  const [search, setSearch] = useState("");

  const handleBusqueda = (event) => {
    setSearch(event.target.value);
  };

  const users = [
    { userName: "Jenny", rank: 1, status: "advance" },
    { userName: "Pablo", rank: 2, status: "retreat" },
    { userName: "Alice", rank: 3, status: "none" },
    { userName: "David", rank: 4, status: "advance" },
    { userName: "Oliver", rank: 5, status: "advance" },
    { userName: "Emma", rank: 6, status: "none" },
    { userName: "Sophia", rank: 7, status: "retreat" },
    { userName: "Ava", rank: 8, status: "advance" },
    { userName: "Liam", rank: 9, status: "none" },
    { userName: "Noah", rank: 10, status: "retreat" },
  ];

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box style={{ margin: 30 }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Search style={{ margin: "20px 30px" }} />
        <input
          id="userSearch"
          label="Search"
          variant="outlined"
          placeholder="Search User"
          value={search}
          onChange={handleBusqueda}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            width: "100%",
            marginRight: "40px",
            fontSize: "1rem",
            height: "25px",
          }}
        />
      </Box>
      <Box style={{marginTop : "30px"}}>
      {filteredUsers.map((user, index) => (
        <UserCard user={user} key={index} />
      ))}
      </Box>
    </Box>
  );
};

export default RankingSearch;
