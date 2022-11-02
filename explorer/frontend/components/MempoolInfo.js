import React from "react";

export default function MempoolInfo({ result }) {
  return (
    <>
      {result ? (
        <tr>
          <td>{result.id}</td>
          <td>{result.input.length}</td>
          <td>{result.output.length}</td>
          <td>{result.output.size}</td>
        </tr>
      ) : (
        <tr>
          <td>No Data</td>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
      )}
    </>
  );
}

// [
//   {
//     id: "2ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117",
//     inputs: [
//       {
//         boxId:
//           "1ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117",
//         spendingProof: {
//           proofBytes:
//             "4ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd1173ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd1173ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117",
//           extension: {
//             1: "a2aed72ff1b139f35d1ad2938cb44c9848a34d4dcfd6d8ab717ebde40a7304f2541cf628ffc8b5c496e6161eba3f169c6dd440704b1719e0",
//           },
//         },
//       },
//     ],
//     dataInputs: [
//       {
//         boxId:
//           "1ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117",
//       },
//     ],
//     outputs: [
//       {
//         boxId:
//           "1ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117",
//         value: 147,
//         ergoTree:
//           "0008cd0336100ef59ced80ba5f89c4178ebd57b6c1dd0f3d135ee1db9f62fc634d637041",
//         creationHeight: 9149,
//         assets: [
//           {
//             tokenId:
//               "4ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117",
//             amount: 1000,
//           },
//         ],
//         additionalRegisters: {
//           R4: "100204a00b08cd0336100ef59ced80ba5f89c4178ebd57b6c1dd0f3d135ee1db9f62fc634d637041ea02d192a39a8cc7a70173007301",
//         },
//         transactionId:
//           "2ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117",
//         index: 0,
//       },
//     ],
//     size: 0,
//   },
// ];
