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
    const { page, size } = req.query;

    client
      .search({
        index: "ergo_wallet",
        body: {
          from: page * size,
          size: size,
          query: {
            match_all: {},
          },
          sort: [
            {
              height: {
                order: "desc",
              },
            },
          ],
        },
      })
      .then((results) => {
        console.log(results.body.hits.hits);
        res.status(200).json(results.body.hits.hits);
      });
  }
}
