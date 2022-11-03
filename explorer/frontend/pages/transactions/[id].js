import Header from "../../components/header";
import TransactionDetail from "../../components/TransactionDetail";

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
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
