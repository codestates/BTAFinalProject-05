import MempoolInfo from "./MempoolInfo";

export default function MempoolResult({ results }) {
  return (
    <div className="m-8 flex flex-col ">
      <div className="m-2 text-lg">Mempool</div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>INPUTS</th>
              <th>OUTPUTS</th>
              <th>SIZE</th>
            </tr>
          </thead>
          <tbody>
            {results ? (
              results.map((result) => (
                <MempoolInfo key={result.id} result={result} />
              ))
            ) : (
              <MempoolInfo key={0} result={null} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  // get block with height range (fromHeight, toHeight)
  const node = process.env.ERGO_NODE;
  const url = `${node}/transactions/unconfirmed?limit=50&offset=0`;
  console.log(url);
  const request = await fetch(url).then((response) => response.json());

  return {
    props: {
      results: request,
    },
  };
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
