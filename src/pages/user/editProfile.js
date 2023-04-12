import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Checkbox, Typography } from "@mui/material";
import SetIdiomas from "@/commons/SetIdiomas";
import ReactInputMask from "react-input-mask";
import { useSelector } from "react-redux";
import { useIntl, FormattedMessage } from "react-intl";
import { validateInput } from "../../../utils/functions";
import Link from "next/link";

const Profile = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const intl = useIntl();

  const [checked, setChecked] = useState(true);
  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

  useEffect(() => {
    if (userInfo) {
      setCellphone(userInfo.cellphone);
      setAddress(userInfo.address);
      setUserName(userInfo.username);
    }
  }, [userInfo]);

  const handleSave = async () => {
    if (userInfo && validateInput(address) != false) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/update/${uid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              cellphone,
              address,
            }),
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          alert("The changes have been made successfully");
        }
        return data;
      } catch {
        alert("There was an error while updating the user information");
        throw new Error("Invalid input");
      }
    } else {
      alert("Please check that there are no special characters");
      throw new Error("Invalid input");
    }
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid grey",
          padding: "10%",
          borderRadius: "5px ",
          maxWidth: "95%",
          margin: " 5% auto",
          backgroundColor: "#F7F7F7",
          padding: "2rem",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        }}
        noValidate
        autoComplete="on"
      >
        <Typography component="h1" variant="h5" color="#454546" marginTop="3%">
          <div> {intl.formatMessage({ id: "data" })}</div>
        </Typography>

        <TextField
          mt="5%"
          label={intl.formatMessage({ id: "username" ,defaultMessage: "Username" })}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setUserName(e.target.value)}
        />

        <div sx={{ p: "30%" }}>
          <TextField
            mt="5%"
            label={intl.formatMessage({ id: "address",defaultMessage: "Address" })}
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <ReactInputMask
            mask="+99-999-99999999"
            maskChar=""
            onChange={(e) => setCellphone(e.target.value)}
          >
            {() => (
              <TextField
                mt="5%"
                id="Cellphone"
                type="text"
                label={intl.formatMessage({ id: "cell" })}
                InputLabelProps={{
                  shrink: true,
                }}
              
                required={true}
              />
            )}
          </ReactInputMask>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            component="h1"
            variant="h6"
            color="#454546"
            marginTop="3%"
          >
            <FormattedMessage id="notifications" />
          </Typography>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            component="p"
            variant="p"
            color="#454546"
            marginTop="3%"
            marginLeft="1.5%"
          >
            {intl.formatMessage({ id: "language" })}
          </Typography>
          <SetIdiomas />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSave}
        >
          <FormattedMessage id="save" />
        </Button>
        <Link href="/home">
          <Button
            sx={{
              mt: 3,
              alignSelf: "flex-end",
              color: "inherit",
              justifyContent: "center",
            }}
          >
            {intl.formatMessage({ id: "back" })}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Profile;
