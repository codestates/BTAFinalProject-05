import Link from "next/link";
import React from "react";

export default function BlockInfo({ result }) {
  // console.log(result);
  return (
    <tr>
      {/* <td>{result.height}</td> */}
      <td>{result.height}</td>
      <td>{result.timestamp}</td>

      <td>
        <Link className="text-sky-600" href={`/blocks/${result.id}`}>
          {result.id.substring(0, 20) + "..."}
        </Link>
      </td>
      <td>{result.parentId.substring(0, 20) + "..."}</td>
      <td>{result.adProofsRoot.substring(0, 20) + "..."}</td>
      <td>{result.transactionsRoot.substring(0, 20) + "..."}</td>
      <td>{result.adProofsId.substring(0, 20) + "..."}</td>
    </tr>
  );
}
