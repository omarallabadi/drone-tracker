import React, { useMemo } from "react";
import Map, { Marker } from "react-map-gl";
import useDronesStore from "../store/dronesStore";
import "mapbox-gl/dist/mapbox-gl.css";
import dronee from "../Icon/drone.svg";

const MapView = () => {
  const drones = useDronesStore((state) => state.drones);
  const dronesArray = useMemo(() => Object.values(drones), [drones]);
  console.log("dronesArray", dronesArray);

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 55,
        latitude: 25,
        zoom: 5,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    >
      {dronesArray.map((drone) => (
        <Marker
          key={drone.id}
          longitude={drone.longitude}
          latitude={drone.latitude}
          anchor="bottom"
        >
          <div
            style={{
              width: 24,
              height: 24,
              backgroundColor: drone.registrationNumber
                .split("-")[1]
                ?.startsWith("B")
                ? "green"
                : "red",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={dronee}
              alt="drone icon"
              style={{
                width: 20,
                height: 20,
                filter: drone.registrationNumber.split("-")[1]?.startsWith("B")
                  ? "hue-rotate(90deg)"
                  : "none",
                transform: `rotate(${drone.yaw || 0}deg)`,
              }}
            />
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default React.memo(MapView);
