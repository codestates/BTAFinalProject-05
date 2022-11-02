import Head from "next/head";
import Header from "../components/Header";
import BlockResults from "../components/BlockResults";
import MempoolResult from "../components/MempoolResults";

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
  // get block with height range (fromHeight, toHeight)
  const request = await fetch(
    "http://localhost:9052/blocks/chainSlice?fromHeight=0&toHeight=5"
  ).then((response) => response.json());

  return {
    props: {
      results: request,
    },
  };
}
