import Link from "next/link";
import React from "react";

export default function AddressInfo({ result }) {
  // console.log(result);
  return (
    <tr>
      {/* <td>
        <Link
          className="text-sky-600"
          href={`/blocks/${result.outputs[0].transactionId}`}
        >
          {result.outputs[0].transactionId.substring(0, 30) + "..."}
        </Link>
      </td> */}
      {/* <th>height</th>
      <th>numConfirmations</th>
      <th>boxId</th>
      <th>Input Address</th>
      <th>Output Address</th>
      <th>Value</th> */}
      <td>{result.creationHeight}</td>
      <td>{result.numConfirmations}</td>
      <td>
        {result.inputs.map((input, index) => (
          <>
            <div key={index}>
              {input.boxId ? input.boxId.substring(0, 40) + "..." : null}
            </div>
            <br />
          </>
        ))}
      </td>
      <td>
        {result.inputs.map((input, index) => (
          <div key={index}>
            {input.address ? input.address.substring(0, 40) + "..." : null}
          </div>
        ))}
      </td>
      <td>
        {result.outputs.map((output, index) => (
          <>
            <div key={index}>
              {output.boxId ? output.boxId.substring(0, 40) + "..." : null}
            </div>
            <br />
          </>
        ))}
      </td>
      <td>
        <div className="">
          {result.outputs.map((output, index) => (
            <div key={index}>
              <p>
                {output.address
                  ? output.address.substring(0, 40) + "..."
                  : null}
              </p>
              <br />
            </div>
          ))}
        </div>
      </td>
      <td>
        {result.outputs.map((output, index) => (
          <>
            <div key={index}>{output.value ? output.value : null}</div>
            <br />
          </>
        ))}
      </td>
    </tr>
  );
}
