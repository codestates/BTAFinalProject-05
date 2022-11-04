import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env.ES_NODE,
  auth: {
    apiKey: {
      id: process.env.ES_ID,
      api_key: process.env.ES_API_KEY,
    },
  },
});

export default function handler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;
    console.log(id);
    client
      .search({
        index: "ergo_block_header",
        body: {
          query: {
            match: {
              id: id,
            },
          },
        },
      })
      .then((results) => {
        res.status(200).json(results.body.hits.hits);
      });
  }
}
