import AddressInfo from "./AddressInfo";

export default function AddressResults({ results }) {
  // console.log(results);
  return (
    <div className="m-8 flex flex-col ">
      <div className="m-2 text-lg">Results {results.length} </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {/* <th>TransactionId</th> */}
              <th>height</th>
              <th>numConfirmations</th>
              <th>Input boxId</th>
              <th>Input Address</th>
              <th>Output boxId</th>
              <th>Output Address</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <AddressInfo key={result._id} result={result._source} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
