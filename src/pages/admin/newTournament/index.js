import { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
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
      <Box sx={{ margin: isMobile ? "15px 0px" : "30px 70px" }}>
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "horizontal" : "vertical"}
        >
          <Step>
            <StepLabel>Informacion General</StepLabel>
          </Step>
          <Step>
            <StepLabel>Carga equipos</StepLabel>
          </Step>
          <Step>
            <StepLabel>Carga cruces</StepLabel>
          </Step>
          <Step>
            <StepLabel>Revision</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{textAlign: "center", margin: isMobile ? "40px 10px 10px 0px" : "25px 0px"}}>
          <Button
            onClick={handleBack}
            sx={{ marginRight: "20px" }}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Siguiente
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
            <p>Aquí van los campos para cargar los cruces.</p>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Siguiente
            </Button>
            <Matches />
            <Button variant="contained" color="primary" onClick={handleNext}>
              Siguiente
            </Button>
          </div>
        )}
        {activeStep === 3 && (
          <div>
            <p>Aquí va la revisión de los datos cargados.</p>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default LinearStepper;
