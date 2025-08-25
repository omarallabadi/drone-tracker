import React, { useEffect } from "react"
import socket from "../socket"
import useDronesStore from "../store/dronesStore"

const DronesDataProvider = () => {
  const addOrUpdateDrone = useDronesStore(state => state.addOrUpdateDrone)

  useEffect(() => {
    const handleDroneData = (data) => {
      if (data?.features && Array.isArray(data.features)) {
        data.features.forEach((feature) => {
          const coords = feature.geometry?.coordinates
          const props = feature.properties

          if (coords && props) {
            const drone = {
              id: props.serial,
              registrationNumber: props.registration,
              longitude: coords[0],
              latitude: coords[1],
              altitude: props.altitude,
              yaw: props.yaw,
              flightTime: Date.now()
            }

            addOrUpdateDrone(drone)
          }
        })
      }
    }

    socket.on("message", handleDroneData)

    return () => socket.off("message", handleDroneData)
  }, [])

  return null
}

export default DronesDataProvider
