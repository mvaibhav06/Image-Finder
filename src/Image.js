import React from "react";

const Image = ({ images }) => {
  const renderedImage = images.map((image) => {
    console.log(image);
    return (
      <img
        id={image.id}
        src={image.largeImageURL}
        className="rounded mx-auto d-block"
        alt={image.type}
      ></img>
    );
  });
  return <div className="image-list">{renderedImage}</div>;
};

export default Image;
