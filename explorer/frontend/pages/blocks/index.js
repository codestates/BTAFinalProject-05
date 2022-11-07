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
  const { body } = await client.search({
    index: "ergo_block_header",
    body: {
      query: {
        match_all: {},
      },
      size: 20,
      sort: [
        {
          height: {
            order: "desc",
          },
        },
      ],
    },
  });

  const results = body.hits.hits;

  return {
    props: {
      results: results,
    },
  };
}
