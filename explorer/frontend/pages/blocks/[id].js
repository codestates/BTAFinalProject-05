import { useRouter } from "next/router";
import BlockDetail from "../../components/BlockDetail";
import Header from "../../components/Header";

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

export default function BlockDetailPage({ result }) {
  return (
    <>
      <Header />
      <BlockDetail result={result ? result._source : null} />
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  // get transaction from elasticsearch

  const { body } = await client.search({
    index: "ergo_block_detail",
    body: {
      query: {
        match: {
          "header.id": id,
        },
      },
    },
  });

  const result = body.hits.hits;
  console.log(result[0]);
  if (result[0] == null) {
    return {
      props: {
        result: null,
      },
    };
  }
  return {
    props: {
      result: result[0],
    },
  };
}
