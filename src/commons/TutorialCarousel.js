import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function TutorialCarousel({ images }) {
  const carouselProps = {
    animation: "slide",
    autoPlay: false,

  };

  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: "100%", margin: "5%", backgroundColor:"white" }}>
          <Carousel {...carouselProps} sx={{ height:"50%"}}>
            {images.map((image) => (
              <Image
                key={image.id}
                src={image.src}
                alt={image.alt}
                layout="responsive"
                // width={100}
                // height={100}
               style={{ width: '50%', height: '10%' }}
              />
            ))}
          </Carousel>
        </div>
      </Box>
    </>
  );
}
