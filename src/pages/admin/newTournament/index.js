import { useState } from "react";
import { Stepper, Step, StepLabel, Button, StepContent } from "@mui/material";
import Teams from "./Teams";
import Matches from "./Matches";
import GeneralInfo from "./GeneralInfo";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { FormattedMessage } from "react-intl";

function LinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
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
    } else if ((!teams || teams.length < 2 ) && activeStep === 1) {
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

  const handleFinish = () => {
    const generalInfo = JSON.parse(localStorage.getItem("generalInfo"));
    const teams = JSON.parse(localStorage.getItem("teams"));
    console.log(generalInfo);
    /*  async function createTournament() {
      const response = await axios.post(
        "http://localhost:3001/api/tournaments/create",
        {
          active: true,
          beginning: "",
          ending,
          stage,
          title,
          details,
          type,
        }
      );
      console.log(response.data);
      return response.data;
    }
    createTournament(); */
    console.log("proceso terminado");
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
              <FormattedMessage id="info" />
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
          <Step>
            <StepLabel>Review</StepLabel>
            {!isMobile ? (
              <StepContent>
                Review the data before creating the tournament
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
          {activeStep !== 3 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleFinish}>
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
        {activeStep === 3 && (
          <div>
            <p>¡¡ Poner una vista previa de los datos cargados !!</p>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default LinearStepper;
