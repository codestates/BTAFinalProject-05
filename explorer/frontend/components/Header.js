import HeaderIcon from "./HeaderIcon";
import {
  HomeIcon,
  InboxIcon,
  SwitchHorizontalIcon,
  AtSymbolIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
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
        <Link href="/">
          <HeaderIcon Icon={InboxIcon} title="Blocks" />
        </Link>
        <HeaderIcon Icon={SwitchHorizontalIcon} title="Transaction" />
        <HeaderIcon Icon={AtSymbolIcon} title="Address" />
      </div>
    </div>
  );
}
