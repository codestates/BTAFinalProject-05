import HeaderIcon from "./HeaderIcon";
import {
  HomeIcon,
  InboxIcon,
  SwitchHorizontalIcon,
  AtSymbolIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [keyword, setKeyword] = useState(null);

  return (
    <>
      <div className="text-gray-700 flex flex-col items-center p-6 select-none sm:flex-row justify-between">
        <Image
          alt="ergo logo"
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/1762.png"
          width={50}
          height={50}
        />
        <div className="flex">
          <Link href="/">
            <HeaderIcon Icon={HomeIcon} title="Home" />
          </Link>
          <Link href="/blocks">
            <HeaderIcon Icon={InboxIcon} title="Blocks" />
          </Link>
          <HeaderIcon Icon={SwitchHorizontalIcon} title="Transaction" />
          <HeaderIcon Icon={AtSymbolIcon} title="Address" />
        </div>
      </div>
      <div className="flex sm:flex-row justify-center">
        <input
          type="text"
          placeholder="Search Block Id, Transaction, Address"
          className="justify-center input input-bordered w-full max-w-xl"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              console.log(keyword);
            }
          }}
        />
      </div>
    </>
  );
}
