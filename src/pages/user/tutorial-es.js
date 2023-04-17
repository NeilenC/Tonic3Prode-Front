import React from "react";
import TutorialCarousel from "../../commons/TutorialCarousel";
import puppie1 from "../../../public/puppie1.jpeg";
import puppie3 from "../../../public/puppie3.jpeg";
import puppie4 from "../../../public/puppie4.jpeg";
import { Box, Typography } from "@mui/material";

const tutorialUserEspañol = () => {
  const images = [
    { id: 1, src: puppie1, alt: "Image 1" },
    { id: 2, src: puppie3, alt: "Image 2" },
    { id: 3, src: puppie4, alt: "Image 3" },
  ];

  return (
    <>
      <div>
        <TutorialCarousel images={images} />
      </div>
      <div style={{ maxWidth: "100%", margin: "2%" }}>
        <Box
          sx={{
            backgroundColor: "grey.200",
            borderRadius: 4,
            boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.2)",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 4 }}>
          Tutorial de cómo participar
          </Typography>{" "}
          
          <ol>
            <li>Inscríbase al torneo que quiera participar</li>
            <br />
            <li>
              En la botonera del torneo podrá navegar por las opciones
              disponibles
            </li>
            <br />
            <li>Predicciones:</li>
            <p>
              Podrá ver los partidos que se realizaran con sus respectivos
              equipos, fecha y hora.
              <br />
              En caso de haber acertado al resultado exacto se sumarán 5 puntos{" "}
              <br />
              Tus puntos se verán reflejados luego de obtener el resultado de
              cada partido.
            </p>

            <li>Puntuación:</li>
            <p>
              En caso de haber acertado al ganador, se sumarán 3 puntos <br />
              En caso de haber acertado al resultado exacto se sumarán 5 puntos{" "}
              <br />
              Tus puntos se verán reflejados luego de obtener el resultado de
              cada partido <br />
            </p>
            <li>Ganadores:</li>
            <p>
              {" "}
              Los ganadores se dictarán al finalizar el torneo Ganarán aquellos
              participantes que más puntos obtengan, batiéndose por el 1º, 2º y
              3º puesto en relación a los puntos obtenidos <br />
              Si en las posiciones existen dos o mas usuarios empatados en
              puntos, queda a criterio de cada torneo elegir el desempate <br />
            </p>
            <li>Premios: </li>
            <p>
              Quedan a disposición del/los administrador/es del torneo, quienes
              se pondrán en contacto una vez obtenidos los resultados. <br />
              Cada premio se entregará en consecuencia del puesto
              correspondiente, siendo diferente para cada puesto.
            </p>
          </ol>
        </Box>
      </div>
    </>
  );
};

export default tutorialUserEspañol;
