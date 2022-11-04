import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function SearchBar(props) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(null);
  const [type, setType] = useState("blocks");

  const searchKeyword = async () => {
    router.push({
      pathname: `/${type}/search`,
      query: { id: keyword },
    });
  };

  const onChangeSelect = (e) => {
    setType(e.currentTarget.value);
  };

  useEffect(() => {
    const uri = router.pathname;
    const type = uri.split("/")[1];
    console.log(type);
    setType(type);
  }, []);

  return (
    <div className="flex sm:flex-row justify-center">
      {/* {type} */}
      <select
        value={type}
        onChange={onChangeSelect}
        className="select select-bordered max-w-xs"
      >
        <option value="blocks">Block ID</option>
        <option value="transactions">Transaction ID</option>
        <option value="address">Address</option>
      </select>
      <input
        type="text"
        placeholder="Select Type (Block Id, Transaction, Address)"
        className="justify-center input input-bordered w-full max-w-xl"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key == "Enter") {
            searchKeyword();
          }
        }}
      />
    </div>
  );
}

export default SearchBar;
