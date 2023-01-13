import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
    return (
        <div className="bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center mb-10">
            <img
            className="rounded-full h-56 w-56 mb-10"
            src="https://i.imgur.com/4h7mAu7.png"
            alt=""
            />
            <h1 className="text-6xl font-bold text-white">Loading</h1>
        </div>
        <ClipLoader color='#fff' size={50} />
        </div>
        );
}

export default Loading;