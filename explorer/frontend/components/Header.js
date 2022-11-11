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
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <>
      <div className="text-gray-700 flex flex-col items-center p-6 select-none sm:flex-row justify-between">
        <Link href="/">
          <Image
            alt="ergo logo"
            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1762.png"
            width={50}
            height={50}
          />
        </Link>

        <div className="flex">
          <Link href="/">
            <HeaderIcon Icon={HomeIcon} title="Home" />
          </Link>
          <Link href="/blocks">
            <HeaderIcon Icon={InboxIcon} title="Blocks" />
          </Link>
          <Link href="/transactions">
            <HeaderIcon Icon={SwitchHorizontalIcon} title="Transaction" />
          </Link>
          {/* <Link href="/address">
            <HeaderIcon Icon={AtSymbolIcon} title="Address" />
          </Link> */}
        </div>
      </div>
      <SearchBar />
    </>
  );
}
