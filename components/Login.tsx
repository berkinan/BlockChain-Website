import { useMetamask } from "@thirdweb-dev/react";
import React from "react";

function Login() {
	const connectwithMetamask = useMetamask();

	return (
		<div className="bg-[#ffffff] min-h-screen flex flex-col items-center justify-center text-center">
			<div className="flex flex-col items-center mb-20">
			<p className="Header-logo logo-big">SuLottery</p>

				<button
					onClick={connectwithMetamask}
					className="bg-[#173A6A] text-white px-8 py-5 mt-10 shadow-lg font-bold"
				>
					Login with Metamask
				</button>
			</div>
		</div>
	);
}

export default Login;
