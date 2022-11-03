import Head from "next/head";
import Header from "../components/Header";
import BlockResults from "../components/BlockResults";
import MempoolResult from "../components/MempoolResults";

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
});

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Erognet Explorer</title>
        <meta name="description" content="find transactions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <BlockResults results={results} />
      <MempoolResult />
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
    },
  });

  const results = body.hits.hits;

  return {
    props: {
      results: results,
    },
  };
}
