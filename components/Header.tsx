import React from "react";
import { useAddress } from "@thirdweb-dev/react";

function Header() {
	const address = useAddress();
	return (
		<header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
			<div className="flex items-center space-x-2">
				<a href="/" className="Header-logo">
					SuLottery
				</a>
				<div>
					<h1 className="text-lg text-blue-800 font-bold">
						Blockchain Lottery
					</h1>
					<p className="text-sx text-blue-500 truncate">
						User: {address?.substring(0, 5)}...
						{address?.substring(address.length, address.length - 4)}
					</p>
				</div>
			</div>
		</header>
	);
}

export default Header;
