import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function HomeButton({ title}) {
  return (
    <>
      <Box sx={{ "& button": { m: 1 } }}>
        <div >
          <Button variant="outlined" size="large">
            {title}
          </Button>
        </div>
      </Box>
    </>
  );
}
 