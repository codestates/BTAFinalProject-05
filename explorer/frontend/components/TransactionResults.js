import Link from "next/link";
import BlockInfo from "./BlockInfo";

export default function TransactionResults({ results }) {
  return (
    <div className="m-8 flex flex-col ">
      <div className="m-2 text-lg">{results.length} Transactions</div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>inputs</th>
              <th>outputs</th>
              <th>dataInputs</th>
              <th>size</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>
                  <Link
                    className="text-sky-600"
                    href={`/transactions/${result._source.id}`}
                  >
                    {result._source.id}
                  </Link>
                </td>
                <td>{result._source.inputs.length}</td>
                <td>{result._source.outputs.length}</td>
                <td>
                  {result._source.dataInputs
                    ? result._source.dataInputs.length
                    : null}
                </td>
                <td>{result._source.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /* {
    extensionId: '3bbd2baa5c2b49f816182ea694c4ea68604a02ecb8ae0b7e0d5b23448e6c1f00',
    difficulty: '1',
    votes: '000000',
    timestamp: 1667389619870,
    size: 283,
    stateRoot: 'de9270f624580a19eb04539657c9ee8e5746ad1c18d6559810c301c8a55781d803',
    height: 1,
    nBits: 16842752,
    version: 1,
    id: '8667f9eb410e95060478742e159a4c689e27c3a330e8cbd18bb2c7a3e6221dc5',
    adProofsRoot: '5e710ba5acca1ec3bac89ef8f476df7cd74e60ee345584c266318fc694d1438a',
    transactionsRoot: '956fcecd1632c8994b0547f897595cb5db7a39a1119c4222c94f18eec623c4db',
    extensionHash: '0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8',
    powSolutions: {
      pk: '032ae656eae8afe03684da56e89ced23a11d471c060d45abd6081d34f093398690',
      w: '0374f84f27efd416316e4c4ff63b9bbf78d4c15ab3d024a8be0113033c12fe53d2',
      n: '0000000000000000',
      d: 2.7431147085794004e+76
    },
    adProofsId: '17ff7dc8c4ef72eecdf065d4b37be79706f253d160252249427cf924d09d002a',
    transactionsId: '893c21184ac458a4344a092774252d61e4bfde5f5bb76fe672cc015d9394ca75',
    parentId: '0000000000000000000000000000000000000000000000000000000000000000'
  } */
}
