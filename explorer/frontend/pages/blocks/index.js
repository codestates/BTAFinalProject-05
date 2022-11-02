import Head from "next/head";
import Header from "../../components/Header";
import BlockResults from "../../components/BlockResults";
import MempoolResult from "../../components/MempoolResults";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Blocks({ results }) {
  const [total, setTotal] = useState(0);

  const getTotalBlocks = async () => {
    const lastBlock = await axios.get(
      "http://localhost:9052/blocks/lastHeaders/1"
    );
    // console.log(lastBlock);
    setTotal(lastBlock.data[0].height);
  };

  useEffect(() => {
    getTotalBlocks();
  }, []);

  return (
    <div>
      <Header />
      <div className="m-8 text-lg"># Total Block : {total}</div>
      <BlockResults results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  // get block with height range (fromHeight, toHeight)
  const request = await fetch(
    "http://localhost:9052/blocks/lastHeaders/10"
  ).then((response) => response.json());

  return {
    props: {
      results: request,
    },
  };
}
