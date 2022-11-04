import Head from "next/head";
import Header from "../../components/Header";
import BlockResults from "../../components/BlockResults";
import MempoolResult from "../../components/MempoolResults";
import axios from "axios";
import { useState, useEffect } from "react";
import TransactionResults from "../../components/TransactionResults";

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: process.env.ES_NODE,
  auth: {
    apiKey: {
      id: process.env.ES_ID,
      api_key: process.env.ES_API_KEY,
    },
  },
});

export default function Transactions({ results }) {
  // console.log(results);

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
      size: 20,
    },
  });

  const results = body.hits.hits;

  return {
    props: {
      results: results,
    },
  };
}
