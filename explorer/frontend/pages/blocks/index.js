import Header from "../../components/Header";
import BlockResults from "../../components/BlockResults";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Blocks({ results }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const getBlocks = async () => {
    const size = 20;
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
      <Header />
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
      <BlockResults results={data} />
    </div>
  );
}
