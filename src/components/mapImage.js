const MapImage = ({ imageUrl }) => {
  return (
    <div
      style={{
        width: 500,
        height: 300,
        backgroundImage: `url(${imageUrl})`,
        marginTop: 55,
      }}
    ></div>
  );
};

export default MapImage;
