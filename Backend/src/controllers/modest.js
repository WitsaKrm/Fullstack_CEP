// const DB = require("../../configurations/db");
// const Formatted = require("./formatted.data");

// async function checkWaterLevel(amount, days) {
//   // Get the current water level
//   const currentWaterLevel = await getWaterLevel();
//   // Check if the water level is too high
//   if (currentWaterLevel + amount > 15) {
//     throw new Error("Water level too high.");
//   }

//   // Check if the water level is too low
//   if (currentWaterLevel + amount < 5) {
//     throw new Error("Water level too low.");
//   }

//   return currentWaterLevel + amount;
// }

// async function increaseWaterLevel(amount, days) {
//   try {
//     // Get the updated water level
//     const updatedWaterLevel = await checkWaterLevel(amount, days);
//     console.log(`Increase water level to ${updatedWaterLevel} cm.`);

//     // Simulate the passage of days
//     await waitDays(days);
//   } catch (error) {
//     // Handle any errors that occur during the water level adjustment
//     // await handleException(error);
//   }
// }

// async function waitDays(days) {
//   console.log(`Wait for ${days} days.`);

//   // Simulate the passage of days
//   await new Promise((resolve) => setTimeout(resolve, days * 24 * 60 * 60 * 1000));
// }

// async function main() {
//   console.log("Starting work on 7/9/2566.");

//   // Step 1
//   await increaseWaterLevel(5, 3);

//   // Step 2
//   await increaseWaterLevel(5, 15);

//   // Step 3
//   await waitDays(15);

//   // Step 4
//   await increaseWaterLevel(5, 15);

//   // Step 5
//   await waitDays(15);

//   // Step 6
//   await increaseWaterLevel(5, 15);

//   // Step 7
//   // Assuming the rice is in the maximum tillering stage
//   await increaseWaterLevel(5, 3);

//   // Step 8
//   await waitDays(7);

//   // Step 9
//   await increaseWaterLevel(5, 20);

//   // Step 10
//   console.log("Release water and let the field dry.");

//   // Handle any weather or machine problems that may arise
//   await handleBadWeather();
//   await handleMachineProblem();
// }

// main().then(() => {
//   console.log("completed.");
// }).catch((error) => {
//   console.error("Error:", error);
// });