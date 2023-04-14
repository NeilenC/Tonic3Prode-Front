import React from 'react'
import TutorialCarousel from "../../commons/TutorialCarousel"
import puppie1 from "../../../public/puppie1.jpeg";
import puppie3 from "../../../public/puppie3.jpeg";
import puppie4 from "../../../public/puppie4.jpeg";

const tutorialUserEspañol = () => {

  const images = [
    { id: 1, src: puppie1, alt: "Image 1" },
    { id: 2, src: puppie3, alt: "Image 2" },
    { id: 3, src: puppie4, alt: "Image 3" },
  ];

  return (
    <div>
      <TutorialCarousel images={images}/>
      </div>
  )
}

export default tutorialUserEspañol