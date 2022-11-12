import Link from "next/link";

function TransactionBox({ title, content }) {
  let url = null;
  if (title == "address") {
    url = `http://localhost:3000/address/search?id=${content}`;
  }
  return (
    <div className="pt-6 p-3 md:p-3 md:text-left">
      <div className="font-bold text-lg">
        <div className="text-slate-700 dark:text-slate-800">{title}</div>
      </div>
      <div className="text-lg font-medium break-all">
        {title == "address" ? (
          <Link className="text-sky-600" href={url}>
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default TransactionBox;
