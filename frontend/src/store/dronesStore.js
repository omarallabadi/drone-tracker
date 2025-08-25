import { create } from "zustand";

const useDronesStore = create((set, get) => ({
  drones: {},
  addOrUpdateDrone: (drone) => {
    console.log("Adding or updating drone:", drone);
    const existingDrone = get().drones[drone.id];
    if (existingDrone && JSON.stringify(existingDrone) === JSON.stringify(drone)) {
      return;
    }
    set(state => ({
      drones: {
        ...state.drones,
        [drone.id]: drone,
      },
    }));
  },
}));

export default useDronesStore;
