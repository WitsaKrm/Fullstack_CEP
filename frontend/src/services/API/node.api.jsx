// // node.api.jsx
// import { useEffect } from "react";
// import API from "../../services/API/axios";


// export function FetchNodes(setNodes) {
//     const fetchNodes = async () => {
//         try {
//           const res = await API.get("/nodes");
//           setNodes(res.data.nodes);
//         } catch (error) {
//           console.error("Failed to fetch nodes:", error);
//         }
//       };
// }
// const FetchNodes = (setNodes) => {
//   useEffect(() => {
//     const fetchNodes = async () => {
//       try {
//         const res = await API.get("/nodes");
//         setNodes(res.data.nodes);
//       } catch (error) {
//         console.error("Failed to fetch nodes:", error);
//       }
//     };
//     fetchNodes();
//   }, [setNodes]);
// };

// const FetchStations = (setStations) => {
//   useEffect(() => {
//     const fetchStations = async () => {
//       try {
//         const res = await API.get("/station");
//         setStations(res.data.stations);
//       } catch (error) {
//         console.error("Failed to fetch stations:", error);
//       }
//     };
//     fetchStations();
//   }, [setStations]);
// };


// export { FetchNodes, FetchStations };
