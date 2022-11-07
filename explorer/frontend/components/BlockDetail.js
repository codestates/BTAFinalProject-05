export default function BlockDetail({ result }) {
  console.log(result);
  return (
    <div className="overflow-x-auto m-3">
      {result ? (
        <>
          <div className="m-3 text-lg">Block #{result.header.height}</div>
          <table className="table table-zebra w-full">
            <tbody>
              <tr>
                <th>Height</th>
                <td>{result.header.height}</td>
              </tr>
              <tr>
                <th>Timestamp</th>
                <td>{result.header.timestamp}</td>
              </tr>
              <tr>
                <th>Id</th>
                <td>{result.header.id}</td>
              </tr>
              <tr>
                <th>parentId</th>
                <td>{result.header.parentId}</td>
              </tr>
              <tr>
                <th>adProofsRoot</th>
                <td>{result.header.adProofsRoot}</td>
              </tr>
              <tr>
                <th>Difficulty</th>
                <td>{result.header.transactionsRoot}</td>
              </tr>
              <tr>
                <th>extensionHash</th>
                <td>{result.header.extensionHash}</td>
              </tr>
              <tr>
                <th>size</th>
                <td>{result.size}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <div className="m-3 text-lg">Block Not Exists</div>
      )}
    </div>
  );
}
