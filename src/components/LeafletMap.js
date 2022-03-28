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
  const [position, setPosition] = useState([
    -31.408740136908488, -64.19174194335939,
  ]);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    load() {
      handleLocation(map.getCenter());
    },
    moveend() {
      setPosition(map.getCenter());
      let location = { lat: map.getCenter().lat, lng: map.getCenter().lng };
      handleLocation(location);
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
          textAlign: "-webkit-center",
          paddingBottom: "1em",
        }}
      >
        <MapContainer
          center={position}
          zoom={10}
          style={{ height: "50vh" }}
          whenCreated={(map) => {
            handleLocation(map.getCenter());
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker handleLocation={handleLocation}></LocationMarker>
        </MapContainer>
        <Typography align="center" variant="caption">
          Drag the map to the place where you want us to send your order
        </Typography>
        <Typography align="center" variant="body1">
          Click/Tap to get your current location
        </Typography>
      </div>
    </>
  );
};

export default LeafletMap;
