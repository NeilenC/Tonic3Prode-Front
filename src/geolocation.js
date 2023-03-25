import React from "react"
import axios from "axios";


export const getGeoLocation = (id) => {

    const doc = document; // Estructura que nos permite acceder a los nodos del documento
    const nav = navigator; // Devuelve caracteristicas del dispositivo que esta accediendo
//   const $id = doc.getElementById(id);


   const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // let infoRegion = await getRegionInfo(latitude,longitude)
    // console.log("info region", infoRegion)
  }
    const error = (err) => {
        alert(`ERROR(${err.code}): ${err.message}`);
  };

  nav.geolocation.getCurrentPosition(success, error, options);
  
};


// async function getRegionInfo(lat, lng) {
//   const apiKey = 'AIzaSyAwm5ghqpLlpwtLk80CMRxzVZjWQoWbr0A';
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

//   const response = await fetch(url);
//   const data = await response.json();
// console.log("DATA", data)
//   if (data.status === 'OK') {
//     const result = data.results[0];

//     // Obtiene el idioma predominante de la región
//     const language = result?.address_components.find(component =>
//       component.types.includes('language')
//     )?.short_name;

//     return {
//       address: result.formatted_address,
//       language
//     };
//   } else {
//     throw new Error('No se pudo obtener la información de la región');
//   }
// }



















