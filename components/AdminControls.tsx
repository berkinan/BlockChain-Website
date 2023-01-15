import React from "react";

import{
    StarIcon,
    CurrencyDollarIcon,
    ArrowPathIcon,
    ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";

import{
    useContract,
    useContractWrite,
    useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../constants";
import toast from "react-hot-toast";

function AdminControls() {
    const{ contract, isLoading } = useContract(
        process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
    );

    const { data: totalCommission } = useContractRead(contract, "operatorTotalCommission");

    const {mutateAsync: DrawWinnerTicket } = useContractWrite(contract,"DrawWinnerTicket");
    const {mutateAsync: RefundAll } = useContractWrite(contract,"RefundAll");
    const {mutateAsync: restartDraw } = useContractWrite(contract,"restartDraw");
    const {mutateAsync: WithdrawCommission } = useContractWrite(contract,"WithdrawCommission");

    const drawWinner = async () => {
        const notificiation = toast.loading("Picking a winner...");

        try{
			const data = await DrawWinnerTicket([{}]);

			toast.success("A winner has been selected!", {id: notificiation,});

            console.info("contract call success", {id: notificiation,});
		} catch(err){
			toast.error("Whoops something went wrong!", {id: notificiation,});

			console.error("contract call failure", err);
		}
    }; 

    const onWithdrawCommission = async () => {
        const notificiation = toast.loading("Withdrawing commission...");

        try{
			const data = await WithdrawCommission([{}]);

			toast.success("Your Commission has been withdrawn successfully!", {id: notificiation,});

            console.info("contract call success", {id: notificiation,});
		} catch(err){
			toast.error("Whoops something went wrong!", {id: notificiation,});

			console.error("contract call failure", err);
		}
    };

    const onRestartDraw = async () => {
        const notificiation = toast.loading("Restarting draw...");

        try{
			const data = await restartDraw([{}]);

			toast.success("Restarted Successfully!", {id: notificiation,});

            console.info("contract call success", {id: notificiation,});
		} catch(err){
			toast.error("Whoops something went wrong!", {id: notificiation,});

			console.error("contract call failure", err);
		}
    };
    const onRefundAll = async () => {
        const notificiation = toast.loading("Refunding all...");

        try{
			const data = await RefundAll([{}]);

			toast.success("All refunded successfully!", {id: notificiation,});

            console.info("contract call success", {id: notificiation,});
		} catch(err){
			toast.error("Whoops something went wrong!", {id: notificiation,});

			console.error("contract call failure", err);
		}
    };



  return (
    <div className="text-blue-800 text-center px-5 py-3 rounded-md border-blue-800 border">
        <h2 className="font-bold">Admin Controls</h2>
        <p className="mb-5">Total Commision to be withdrawn: {" "}
        {totalCommission && ethers.utils.formatEther(totalCommission?.toString())}{" "}{currency}
        </p>

        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <button onClick={drawWinner} className="admin-button text-white"><StarIcon className="h-6 mx-auto mb-2"/>Draw Winner</button>
            <button onClick={onWithdrawCommission} className="admin-button text-white"><CurrencyDollarIcon className="h-6 mx-auto mb-2"/>Withdraw Commission</button>
            <button onClick={onRestartDraw} className="admin-button text-white"><ArrowPathIcon className="h-6 mx-auto mb-2"/>Restart Draw</button>
            <button onClick={onRefundAll} className="admin-button text-white"><ArrowUturnDownIcon className="h-6 mx-auto mb-2"/>Refund All</button>
        </div>
    </div>
  );
}

export default AdminControls;
