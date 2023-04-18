import React from 'react'
import TutorialCarousel from "../../commons/TutorialCarousel"
import puppie1 from "../../../public/puppie1.jpeg";
import puppie3 from "../../../public/puppie3.jpeg";
import puppie4 from "../../../public/puppie4.jpeg";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from 'react';

const tutorial = () => {
  const [language, setLanguage] = React.useState("");
  // const images = [
  //   { id: 1, src: puppie1, alt: "Image 1" },
  //   { id: 2, src: puppie3, alt: "Image 2" },
  //   { id: 3, src: puppie4, alt: "Image 3" },
  // ];

  useEffect(() => {
    console.log("useEffect");
    const fetchLanguage = async () => {
      try {
        const uid = localStorage.getItem("uid");
        const res = await axios.get(
          `http://localhost:3001/api/users/search/${uid}`
        );
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
      {/* <div>
        <TutorialCarousel images={images} />
      </div> */}
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
                En caso de haber acertado al resultado exacto se sumarán 5
                puntos <br />
                Tus puntos se verán reflejados luego de obtener el resultado de
                cada partido.
              </p>

              <li>Puntuación:</li>
              <p>
                En caso de haber acertado al ganador, se sumarán 3 puntos <br />
                En caso de haber acertado al resultado exacto se sumarán 5
                puntos <br />
                Tus puntos se verán reflejados luego de obtener el resultado de
                cada partido <br />
              </p>
              <li>Ganadores:</li>
              <p>
                {" "}
                Los ganadores se dictarán al finalizar el torneo Ganarán
                aquellos participantes que más puntos obtengan, batiéndose por
                el 1º, 2º y 3º puesto en relación a los puntos obtenidos <br />
                Si en las posiciones existen dos o mas usuarios empatados en
                puntos, queda a criterio de cada torneo elegir el desempate{" "}
                <br />
              </p>
              <li>Premios: </li>
              <p>
                Quedan a disposición del/los administrador/es del torneo,
                quienes se pondrán en contacto una vez obtenidos los resultados.{" "}
                <br />
                Cada premio se entregará en consecuencia del puesto
                correspondiente, siendo diferente para cada puesto.
              </p>
            </ol>
          </>
        ) : language === "en" ? (
          <>
            <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 4 }}>
              Tutorial on How to Participate
            </Typography>{" "}
            <ol>
              <li>Sign up for the tournament you want to participate in</li>
              <br />
              <li>
                In the tournament menu, you can navigate through the available
                options
              </li>
              <br />
              <li>Predictions:</li>
              <p>
                You can view the matches that will be held with their respective
                teams, date and time.
                <br />
                In case you correctly guess the exact result, you will get 5
                points
                <br />
                Your points will be reflected after each match result is
                obtained.
              </p>
              <li>Scoring:</li>
              <p>
                If you correctly guess the winner, you will get 3 points
                <br />
                In case you correctly guess the exact result, you will get 5
                points
                <br />
                Your points will be reflected after each match result is
                obtained.
              </p>
              <li>Winners:</li>
              <p>
                The winners will be determined at the end of the tournament.
                Those participants who get the most points will win, competing
                for 1st, 2nd and 3rd place based on the points obtained.
                <br />
                If there are two or more users tied in the positions, it is up
                to each tournament to choose the tiebreaker.
                <br />
              </p>
              <li>Prizes:</li>
              <p>
                Prizes are at the discretion of the tournament administrator(s),
                who will contact you once the results are obtained.
                <br />
                Each prize will be awarded according to the corresponding
                position, being different for each position.
              </p>
            </ol>
          </>
        ) : language === "pt" ? (
          <>
            <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 4 }}>
              Tutorial de Como Participar
            </Typography>{" "}
            <ol>
              <li>Registre-se no torneio em que deseja participar</li>
              <br />
              <li>
                No menu do torneio, você pode navegar pelas opções disponíveis
              </li>
              <br />
              <li>Previsões:</li>
              <p>
                Você pode ver os jogos que serão realizados com seus respectivos
                times, data e hora.
                <br />
                Caso você acerte o resultado exato, você receberá 5 pontos
                <br />
                Seus pontos serão refletidos após cada resultado de partida
                obtido.
              </p>
              <li>Pontuação:</li>
              <p>
                Se você acertar o vencedor, receberá 3 pontos
                <br />
                Caso você acerte o resultado exato, receberá 5 pontos
                <br />
                Seus pontos serão refletidos após cada resultado de partida
                obtido.
              </p>
              <li>Vencedores:</li>
              <p>
                Os vencedores serão determinados no final do torneio. Os
                participantes com mais pontos vencerão, competindo pelo 1º, 2º e
                3º lugar com base nos pontos obtidos.
                <br />
                Se houver dois ou mais usuários empatados nas posições, fica a
                critério de cada torneio escolher o desempate.
                <br />
              </p>
              <li>Prêmios:</li>
              <p>
                Os prêmios estão a critério do(s) administrador(es) do torneio,
                que entrarão em contato assim que os resultados forem obtidos.
                <br />
                Cada prêmio será concedido de acordo com a posição
                correspondente, sendo diferente para cada posição.
              </p>
            </ol>
          </>
        ) : null}
      </Box>
    </>
  );
}


export default tutorial