import React from "react";
import NavButton from "./NavButton";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

function Header() {
	const address = useAddress();
	const disconnect = useDisconnect();
	return (
		<header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
			<div className="flex items-center space-x-2">
				<a href="/" className="Header-logo">SuLottery</a>
				<div>
					<h1 className="text-lg text-blue-800 font-bold">Blockchain Lottery</h1>
					<p className="text-sx text-blue-500 truncate">
						User: {address?.substring(0, 5)}...
						{address?.substring(address.length, address.length - 4)}
					</p>
				</div>
			</div>
			<div className="hidden md:flex md:col-span-3 items-center justify-center rounded-md">
				<div className="bg-[#173A6A] p-4 space-x-2">
					<NavButton title="Auction" isActive />
					<NavButton onClick={disconnect} title="Logout" />
				</div>
			</div>

			<div className="flex flex-col ml-auto text-right">
				<span className="md:hidden">
					<NavButton onClick={disconnect} title="Logout" />
				</span>
			</div>
		</header>
	);
}

export default Header;
