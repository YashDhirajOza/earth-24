import { World } from "./World/World.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // scene container
  const container = document.querySelector("#scene-container");

  // creating new instance of world class
  const world = new World(container);

  // starting world
  world.start();

  // Create an array of satellites with random initial coordinates
  const satellites = Array.from({ length: 5 }, () => ({
    latitude: Math.random() * 180 - 90,  // Random latitude between -90 and 90
    longitude: Math.random() * 360 - 180, // Random longitude between -180 and 180
    latIncrement: Math.random() * 0.2 - 0.1, // Random latitude increment between -0.1 and 0.1
    lonIncrement: Math.random() * 0.2 - 0.1, // Random longitude increment between -0.1 and 0.1
  }));

  // Infinite loop to update the location of each satellite
  for (;;) {
    satellites.forEach((satellite, index) => {
      // Update latitude and longitude for each satellite
      satellite.latitude += satellite.latIncrement;
      satellite.longitude += satellite.lonIncrement;

      // Ensure the values wrap around properly
      if (satellite.latitude > 90) satellite.latitude = -90;
      if (satellite.latitude < -90) satellite.latitude = 90;
      if (satellite.longitude > 180) satellite.longitude = -180;
      if (satellite.longitude < -180) satellite.longitude = 180;

      // Update the location in the world
      world.findLocation(satellite.latitude, satellite.longitude);

      // Optionally, you can log or visualize which satellite is being updated
      console.log(`Satellite ${index + 1}: (${satellite.latitude.toFixed(2)}, ${satellite.longitude.toFixed(2)})`);
    });

    // Wait for 500 milliseconds before the next update
    await sleep(500);
  }
}

main();
