import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";
import Image from "next/image";


export default function TutorialCarousel({images}) {
  const carouselProps = {
    animation: "slide",
    autoPlay: false
  };


  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <Carousel {...carouselProps}>
          {images.map((image) => (
            <Image 
              key={image.id} 
              src={image.src} 
              alt={image.alt} 
              layout="responsive"
              width={500}
              height={500}
            />
          ))}
        </Carousel>
      </Box>
    </>
  );
}
