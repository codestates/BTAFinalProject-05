import Link from "next/link";
import React from "react";

export default function BlockInfo({ result }) {
  return (
    <tr>
      <td>{result.height}</td>
      <td>{result.timestamp}</td>

      <td>
        <Link className="text-sky-600" href={`/blocks/${result.id}`}>
          {result.id.substring(0, 20) + "..."}
        </Link>
      </td>
      <td>
        <Link className="text-sky-600" href={`/blocks/${result.parentId}`}>
          {result.parentId.substring(0, 20) + "..."}
        </Link>
      </td>
      <td>{result.adProofsRoot}</td>
      <td>{result.transactionsRoot}</td>
      <td>{result.adProofsId}</td>
    </tr>
  );
}
