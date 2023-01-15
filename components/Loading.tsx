import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
	return (
		<div className="bg-[#ffffff] min-h-screen flex flex-col items-center justify-center text-center">
			<div className="flex flex-col items-center mb-20">
				<p className="Header-logo logo-big">SuLottery</p>
			</div>
			<ClipLoader color="#173A6A" size={50} />
		</div>
	);
}

export default Loading;
