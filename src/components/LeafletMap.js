import { Typography } from "@mui/material";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const LocationMarker = ({ handleLocation }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    moveend() {
      setPosition(map.getCenter());
      handleLocation(map.getCenter());
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Deliver my package here</Popup>
    </Marker>
  );
};

const LeafletMap = ({ handleLocation }) => {
  const position = [-31.408740136908488, -64.19174194335939];

  return (
    <>
      <div
        id="map"
        style={{
          margin: "0",
          width: "100%",
          // textAlign: "-webkit-center",
          paddingBottom: "1em",
        }}
      >
        <MapContainer
          center={position}
          zoom={10}
          style={{ height: "50vh", width: "50%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker handleLocation={handleLocation}></LocationMarker>
        </MapContainer>
        <Typography align="center">
          Drag the map to the place where you want us to send your order
        </Typography>
      </div>
    </>
  );
};

export default LeafletMap;
