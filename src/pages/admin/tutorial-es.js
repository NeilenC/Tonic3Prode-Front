import React from "react";
import TutorialCarousel from "../../commons/TutorialCarousel";
import puppie1 from "../../../public/puppie1.jpeg";
import puppie3 from "../../../public/puppie3.jpeg";
import puppie4 from "../../../public/puppie4.jpeg";
import { Box, Typography } from "@mui/material";

const tutorialAdminEspañol = () => {
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
      <Box
        sx={{
          backgroundColor: "grey.200",
          borderRadius: 4,
          boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.2)",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 4 }}>
          Tutorial administrador
        </Typography>{" "}
        <br />
        <ol>
          <li>Crear torneos:</li>
          <p>
            El administrador tiene a disposición la sección de creación de
            torneos, en la que seleccionará la fecha en la que inicia y culmina
            el mismo
            <br />
            Seleccionará los equipos que participarán en el torneo <br />
            Creará los partidos entre equipos
            <br />
          </p>
          <li>Resultados:</li>
          <p>
            Teniendo acceso a los resultados del torneo, cargará los mismos en
            el panel de RESULTS
            <br />
            Se tendrán en cuenta las etapas en las que se encuentra el torneo{" "}
            <br />
          </p>
          <li>Premios:</li>
          <p>
            Tendrá la posibilidad de cargar los premios correspondientes a los
            futuros ganadores del 1º, 2º y 3º puesto
            <br />
            Tendrá la responsabilidad de contactarse con los ganadores de los
            debidos premios al momento siguiente de obtener los resultados una
            vez culminado dicho torneo <br />
          </p>
          <li>Edición:</li>
          <p>
            Puede promoverlos edición de usuarios a administrador
            <br />
            Puede eliminar usuarios existentes
            <br />
            Puede crear equipos <br />
            Puede editar equipos
            <br />
            Puede editar partidos
            <br />
            Puede editar resultados de partidos ya jugados en caso de
            equivocación
            <br />
          </p>
        </ol>
      </Box>
    </>
  );
};

export default tutorialAdminEspañol;
