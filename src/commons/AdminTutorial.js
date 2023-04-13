import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";
import Image from "next/image";
import puppie1 from "../../public/puppie1.jpeg";
import puppie3 from "../../public/puppie3.jpeg";
import puppie4 from "../../public/puppie4.jpeg";

export default function AdminTutorial() {
  const carouselProps = {
    animation: "slide",
    autoPlay: false
  };

  const images = [
    { id: 1, src: puppie1, alt: "Image 1" },
    { id: 2, src: puppie3, alt: "Image 2" },
    { id: 3, src: puppie4, alt: "Image 3" },
  ];

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
