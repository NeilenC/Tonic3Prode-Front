import { useState } from "react";
import { Stepper, Step, StepLabel, Button, StepContent } from "@mui/material";
import Teams from "./Teams";
import Matches from "./Matches";
import GeneralInfo from "./GeneralInfo";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";

function LinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: "20px",
        
      }}
    >
      <Box sx={{ margin: isMobile ? "15px 0px 30px 0px" : "30px 70px", }}>
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "horizontal" : "vertical"}
          sx={{width: isMobile ? "100%" : "300px"}}
        >
          <Step >
            <StepLabel >General Info</StepLabel>
            <StepContent>
              {(!isMobile)? "In this step you must enter the relevant data of the tournament" : ""}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Teams Entry</StepLabel>
            <StepContent>
              {(!isMobile)? "In this step you have to select the teams that will participate in the tournament" : ""}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Matches entry</StepLabel>
            <StepContent>
              {(!isMobile)? "You have to enter the details of the matches of the first stage of the tournament" : ""}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Rewiev</StepLabel>
            <StepContent>
              {(!isMobile)? "Review the data before creating the tournament" : ""}
            </StepContent>
          </Step>
        </Stepper>
        <Box sx={{textAlign: "center", margin: isMobile ? "40px 10px 10px 0px" : "25px 0px"}}>
          <Button
            onClick={handleBack}
            sx={{ marginRight: "20px", display: activeStep == 0 ? "none" : "inline-block"}}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {(activeStep == 3)? "Finish" : "Continue"}
          </Button>
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
