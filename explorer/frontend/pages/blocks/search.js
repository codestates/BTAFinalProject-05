import Head from "next/head";
import Header from "../../components/Header";
import BlockResults from "../../components/BlockResults";
import MempoolResult from "../../components/MempoolResults";
import axios from "axios";
import { useState, useEffect } from "react";

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

export default function Blocks({ results }) {
  const [total, setTotal] = useState(0);

  return (
    <div>
      <Header />
      <BlockResults results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  // get blocks from elasticsearch
  console.log(id);
  const new_id = id.replaceAll('"', "");
  console.log(new_id);
  const { body } = await client.search({
    index: "ergo_block_header",
    body: {
      query: {
        match: {
          id: new_id,
        },
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
