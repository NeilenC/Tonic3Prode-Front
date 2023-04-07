// Función que obtiene la dirección IP del visitante
export function getVisitorIP() {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data.ip)
        return data.ip;
    })
    .catch((error) => console.error(error));
}

// Función que obtiene la información de geolocalización a partir de la dirección IP
export function getGeolocationByIp(ip) {
  const url = `https://ipapi.co/${ip}/json/`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.country_name);
      return data.country_name;
    })
    .catch((error) => console.error(error));
}


// Función que se ejecuta al cargar la página
export async function onPageLoad() {
  try {
    // Obtener la dirección IP del visitante
    const ip = await getVisitorIP();

    // Obtener el nombre del país a partir de la dirección IP
    const country = await getGeolocationByIp(ip);

    // Mostrar el nombre del país en la consola
    console.log(`El visitante está en ${country}`);
  } catch (error) {
    console.error(error);
  }
}

// Llamar a la función onPageLoad cuando se carga completamente la página
if (typeof window !== "undefined") {
  window.addEventListener("load", onPageLoad);
}
