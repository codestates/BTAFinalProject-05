import Head from "next/head";
import Header from "../../components/Header";
import BlockResults from "../../components/BlockResults";
import MempoolResult from "../../components/MempoolResults";
import axios from "axios";
import { useState, useEffect } from "react";
import TransactionResults from "../../components/TransactionResults";

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
});

export default function Transactions({ results }) {
  const [total, setTotal] = useState(0);

  console.log(results);

  return (
    <div>
      <Header />

      <TransactionResults results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  // get transaction from elasticsearch
  const { body } = await client.search({
    index: "ergo_transaction",
    body: {
      query: {
        match_all: {},
      },
    },
  });

  const results = body.hits.hits;

  return {
    props: {
      results: results,
    },
  };
}
