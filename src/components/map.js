import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import MapImage from "./mapImage";

import RenderScene from "./renderScene";

const MapContainer = styled.div`
  width: 50vw;
  height: 50vh;
`;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(0);
  const width = 500;
  const height = 300;

  const [showCube, setShowCube] = useState(false);

  useEffect(() => {
    let map;
    if (mapContainer.current) {
      map = new mapboxgl.Map({
        container: mapContainer.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

      map.on("move", () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
    }

    return () => map.remove();
  }, []);

  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    setImageUrl(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lng},${lat},${zoom},0/${width}x${height}?access_token=${mapboxgl.accessToken}`
    );
  }, [lat, lng, width, height, zoom]);

  return (
    <div>
      <MapContainer
        id="map"
        ref={mapContainer}
        style={{ width: 500, height: 300 }}
      ></MapContainer>

      <div style={{ display: "grid", gridAutoFlow: "column" }}>
        <p>Image:</p>
        <MapImage imageUrl={imageUrl} />

        <div>
          <button
            onClick={() => {
              setShowCube(true);
            }}
          >
            Show 3D
          </button>
          <button
            onClick={() => {
              setShowCube(false);
            }}
          >
            Hide 3D
          </button>
        </div>

        {imageUrl && showCube && <RenderScene texturePath={imageUrl} />}
      </div>
    </div>
  );
};

export default Map;
