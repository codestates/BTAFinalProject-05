import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import TransactionResults from "../../components/TransactionResults";

// const { Client } = require("@elastic/elasticsearch");
// const client = new Client({
//   node: process.env.ES_NODE,
//   auth: {
//     apiKey: {
//       id: process.env.ES_ID,
//       api_key: process.env.ES_API_KEY,
//     },
//   },
// });

export default function Transactions({ results }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const getTransactions = async () => {
    const size = 20;
    const url =
      process.env.NEXT_PUBLIC_URL +
      `/api/transaction?page=${page}&size=${size}`;
    console.log(url);
    const transaction = await axios.get(url);
    setData(transaction.data);
  };

  useEffect(() => {
    getTransactions();
  }, [page]);

  return (
    <div>
      <Header />
      <div className="ml-8 m-5">
        <div className="btn-group grid grid-cols-12">
          <button
            className="btn btn-outline"
            onClick={() => {
              if (page == 0) return;
              setPage(page - 1);
            }}
          >
            Prev
          </button>
          <button className="btn btn-outline">{page + 1}</button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
      <TransactionResults results={data} />
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const id = context.query.id;
//   // get transaction from elasticsearch
//   const { body } = await client.search({
//     index: "ergo_transaction",
//     body: {
//       query: {
//         match_all: {},
//       },
//       size: 20,
//     },
//   });

//   const results = body.hits.hits;

//   return {
//     props: {
//       results: results,
//     },
//   };
// }
