import React, { useEffect } from "react";
import TutorialCarousel from "../../commons/TutorialCarousel";
import puppie1 from "../../../public/puppie1.jpeg";
import puppie3 from "../../../public/puppie3.jpeg";
import puppie4 from "../../../public/puppie4.jpeg";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const tutorial = () => {
  const [language, setLanguage] = React.useState("");
  const images = [
    { id: 1, src: puppie1, alt: "Image 1" },
    { id: 2, src: puppie3, alt: "Image 2" },
    { id: 3, src: puppie4, alt: "Image 3" },
  ];

useEffect(() => {
  console.log("useEffect")
  const fetchLanguage = async () => {
    try {
      const uid = localStorage.getItem("uid");
      const res = await axios.get(`http://localhost:3001/api/users/search/${uid}`);
      if (res.data.country === "Argentina") {
        setLanguage("es");
      } else if (res.data.country === "Brazil") {
        setLanguage("pt");
      } else {
        setLanguage("en");
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchLanguage();

}, []);

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
      {language === "es" ? (
        <>
          <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 4 }}>
            Tutorial administrador
          </Typography>{" "}
          <br />
          <ol>
            <li>Crear torneos:</li>
            <p>
              El administrador tiene a disposición la sección de creación de
              torneos, en la que seleccionará la fecha en la que inicia y
              culmina el mismo
              <br />
              Seleccionará los equipos que participarán en el torneo <br />
              Creará los partidos entre equipos
              <br />
            </p>
            <li>Resultados:</li>
            <p>
              Teniendo acceso a los resultados del torneo, cargará los mismos en
              el panel de RESULTADOS
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
              Puede promover la edición de usuarios a administrador
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
        </>
      ) : language === "en" ? (
        <>
          <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 4 }}>
            Administrator Tutorial
          </Typography>{" "}
          <ol>
            <li>Create Tournaments:</li>
            <p>
              The administrator has access to the tournament creation section,
              where they will select the start and end dates of the tournament.
              <br />
              They will select the teams that will participate in the
              tournament.
              <br />
              They will create matches between teams.
              <br />
            </p>
            <li>Results:</li>
            <p>
              Having access to the tournament results, they will enter them into
              the RESULTS panel.
              <br />
              The stages of the tournament will be taken into account.
              <br />
            </p>
            <li>Prizes:</li>
            <p>
              They will have the ability to enter the prizes corresponding to
              the future winners of the 1st, 2nd, and 3rd place.
              <br />
              They will be responsible for contacting the winners of the prizes
              immediately after obtaining the results once the tournament has
              ended.
              <br />
            </p>
            <li>Edition:</li>
            <p>
              They can promote user editing to administrator.
              <br />
              They can delete existing users.
              <br />
              They can create teams.
              <br />
              They can edit teams.
              <br />
              They can edit matches.
              <br />
              They can edit results of already played matches in case of
              mistakes.
              <br />
            </p>
          </ol>
        </>
      ) : language === "pt" ? (
        <>
        <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 4 }}>
Tutorial do Administrador
</Typography>{" "}
        <ol>
          <li>Criar torneios:</li>
          <p>
            O administrador tem à disposição a seção de criação de torneios,
            onde selecionará a data de início e término do mesmo
            <br />
            Selecionará as equipes que participarão do torneio <br />
            Criará as partidas entre equipes
            <br />
          </p>
          <li>Resultados:</li>
          <p>
            Tendo acesso aos resultados do torneio, carregará os mesmos no
            painel de RESULTADOS
            <br />
            Serão consideradas as etapas em que o torneio se encontra <br />
          </p>
          <li>Prêmios:</li>
          <p>
            Terá a possibilidade de carregar os prêmios correspondentes aos
            futuros ganhadores do 1º, 2º e 3º lugares
            <br />
            Terá a responsabilidade de entrar em contato com os vencedores dos
            prêmios devidos logo após obter os resultados assim que o torneio
            tenha terminado. <br />
          </p>
          <li>Edição:</li>
          <p>
            Pode promover a edição de usuários para administrador
            <br />
            Pode excluir usuários existentes
            <br />
            Pode criar equipes <br />
            Pode editar equipes
            <br />
            Pode editar partidas
            <br />
            Pode editar resultados de partidas já jogadas em caso de equívoco
            <br />
          </p>
        </ol>
      </>
      ) : null}
    </Box>
  </>
);
}

export default tutorial
