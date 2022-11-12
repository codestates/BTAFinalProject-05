import Head from "next/head";
import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import AddressResults from "../../components/AddressResults";

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

export default function Addresses({ results }) {
  const [total, setTotal] = useState(0);

  console.log(results);

  return (
    <div>
      <Header />
      <AddressResults results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  const new_id = id.replaceAll('"', "");
  console.log(new_id);
  // get transaction from elasticsearch
  const { body } = await client.search({
    index: "ergo_wallet",
    body: {
      size: 20,
      query: {
        match: {
          "outputs.address": id,
        },
      },
      sort: [
        {
          inclusionHeight: {
            order: "desc",
          },
        },
      ],
    },
  });

  const results = body.hits.hits;
  console.log(results);

  return {
    props: {
      results: results,
    },
  };
}
