import Head from "next/head";
import Header from "../components/Header";
import BlockResults from "../components/BlockResults";
import MempoolResult from "../components/MempoolResults";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ results }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const getBlocks = async () => {
    const size = 5;
    const url =
      process.env.NEXT_PUBLIC_URL + `/api/blocks?page=${page}&size=${size}`;
    console.log(url);
    const blocks = await axios.get(url);
    setData(blocks.data);
    // console.log("blocks from useEffect");
    // console.log(blocks);
  };

  useEffect(() => {
    getBlocks();
  }, []);

  return (
    <div>
      <Head>
        <title>Ergonet Explorer</title>
        <meta name="description" content="find transactions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <MempoolResult />
      <BlockResults results={data} />
      <div className="ml-8">
        <div className="btn-group grid grid-cols-12">
          {page}
          <button
            className="btn btn-outline"
            onClick={() => {
              if (page == 0) return;
              setPage(page - 1);
              getBlocks();
            }}
          >
            Previous page
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setPage(page + 1);
              getBlocks();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
