import { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, StepContent } from "@mui/material";
import Teams from "./Teams";
import Matches from "./Matches";
import GeneralInfo from "./GeneralInfo";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
//import { FormattedMessage } from "react-intl";
import axios from "axios";
import { createDateStrForInputFromSections } from "@mui/x-date-pickers/internals";

function LinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [isFinishDisabled, setIsFinishDisabled] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleNext = () => {
    const generalInfo = JSON.parse(localStorage.getItem("generalInfo"));
    const teams = JSON.parse(localStorage.getItem("teams"));
    const matches = JSON.parse(localStorage.getItem("matches"));

    if (!generalInfo) {
      alert("You must complete all the fields of this page to continue");
      return;
    } else if (
      !generalInfo.title ||
      !generalInfo.status ||
      !generalInfo.type ||
      !generalInfo.members ||
      !generalInfo.numMatches ||
      !generalInfo.beginning ||
      !generalInfo.finishing
    ) {
      alert("You must complete all the fields of this page to continue");
      return;
    } else if ((!teams || teams.length < 2) && activeStep === 1) {
      alert("You must enter at least two teams");
      return;
    } else if (!matches && activeStep === 2) {
      alert("You must enter the matches of the first stage");
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

/*   useEffect(() => {
    if (JSON.parse(localStorage.getItem("matches").length) > 1) {
      setIsFinishDisabled(false);
    }
  }, [numMatches]); */


  const handleFinish = async () => {
    const generalInfo = JSON.parse(localStorage.getItem("generalInfo"));
    const teams = JSON.parse(localStorage.getItem("teams"));
    const matches = JSON.parse(localStorage.getItem("matches"));
    
    const active = generalInfo.status === "active"? true : false
    const stage = "32" // el front todavia no lo envia
    const details = "this is the details of the tournament"

    async function createTournament() {
      const response = await axios.post(
        "http://localhost:3001/api/tournaments/admin/createTournament",
        {
          uid: 0,
          active: active,
          beginning: generalInfo.beginning,
          ending: generalInfo.finishing,
          stage: stage,
          title: generalInfo.title,
          details: details,
          type: generalInfo.type,
        }
      );
      console.log(response.data);
      return response.data;
    }

    const idTournament = await createTournament();

    async function createTeams() {
      const response = await axios.put(
        `http://localhost:3001/api/tournaments/admin/${idTournament}/createTeams`,
        {
          uid: 0,
          teams: teams,
        }
      );
      console.log(response.data);
      return response.data;
    }

    await createTeams();

    async function createMatches() {
      const response = await axios.post(
        `http://localhost:3001/api/games/admin/${idTournament}`,
        {
          uid: 0,
          matches: matches,
        }
      );
      console.log(response.data);
      return response.data;
    }

    await createMatches();

};

  return (
    <Box
      suppressHydrationWarning={true}
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Box sx={{ margin: isMobile ? "15px 0px 30px 0px" : "30px 70px" }}>
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "horizontal" : "vertical"}
          sx={{ width: isMobile ? "100%" : "300px" }}
        >
          <Step>
            <StepLabel>
             Informacion
            </StepLabel>
            {!isMobile ? (
              <StepContent>
                In this step you must enter the relevant data of the tournament
              </StepContent>
            ) : (
              ""
            )}
          </Step>
          <Step>
            <StepLabel>Teams Entry</StepLabel>
            {!isMobile ? (
              <StepContent>
                In this step you have to select the teams that will participate
                in the tournament
              </StepContent>
            ) : (
              ""
            )}
          </Step>
          <Step>
            <StepLabel>Matches entry</StepLabel>
            {!isMobile ? (
              <StepContent>
                You have to enter the details of the matches of the first stage
                of the tournament
              </StepContent>
            ) : (
              ""
            )}
          </Step>
        </Stepper>
        <Box
          sx={{
            textAlign: "center",
            margin: !isMobile ? "40px 10px 10px 0px" : "25px 0px",
          }}
        >
          <Button
            onClick={handleBack}
            sx={{
              marginRight: "20px",
              display: activeStep == 0 ? "none" : "inline-block",
            }}
          >
            Back
          </Button>
          {activeStep !== 2 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinish}
              disabled={isFinishDisabled}
            >
              Finish
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        {activeStep === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GeneralInfo />
          </div>
        )}
        {activeStep === 1 && (
          <div style={{ textAlign: "center" }}>
            <Teams />
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <Matches />
          </div>
        )}
      </Box>
    </Box>
  );
}

export default LinearStepper;
