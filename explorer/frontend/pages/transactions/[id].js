import Header from "../../components/Header";
import TransactionDetail from "../../components/TransactionDetail";

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
      <TransactionDetail result={result} />
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  // get transaction from elasticsearch
  const { body } = await client.search({
    index: "ergo_transaction",
    body: {
      query: {
        match: {
          id: id,
        },
      },
    },
  });

  const result = body.hits.hits;
  console.log(result[0]);

  return {
    props: {
      result: result[0],
    },
  };
}
