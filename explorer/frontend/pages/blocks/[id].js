import { useRouter } from "next/router";
import BlockDetail from "../../components/BlockDetail";
import Header from "../../components/header";

export default function BlockDetailPage({ result }) {
  return (
    <>
      <Header />
      <BlockDetail result={result} />
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  // console.log(id);
  const request = await fetch(`http://localhost:9052/blocks/${id}`).then(
    (response) => response.json()
  );
  // console.log(request);
  return {
    props: {
      result: request,
    },
  };
}
