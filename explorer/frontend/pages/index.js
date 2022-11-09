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
    const size = 10;
    const url =
      process.env.NEXT_PUBLIC_URL + `/api/blocks?page=${page}&size=${size}`;
    console.log(url);
    const blocks = await axios.get(url);
    setData(blocks.data);
  };

  useEffect(() => {
    getBlocks();
  }, [page]);

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
      <div className="ml-8 m-5">
        <div className="btn-group grid grid-cols-12">
          <button
            className="btn btn-outline"
            onClick={() => {
              if (page == 0) return;
              setPage(page - 1);
            }}
          >
            Prev
          </button>
          <button className="btn btn-outline">{page + 1}</button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
