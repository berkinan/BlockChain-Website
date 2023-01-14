import type { NextPage } from "next";
import Head from "next/head";
import Login from "../components/Login";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { useContract, useMetamask, useDisconnect, useContractData, useContractCall, useAddress, useContractMetadata } from "@thirdweb-dev/react";
import { useState } from "react";
import { ethers } from "ethers";
import { currency } from "../constants";
import CountdownTimer from "../components/CountdownTimer";
import toast from "react-hot-toast";

const Home: NextPage = () => {
	const address = useAddress();
	const [quantity, setQuantity] = useState<number>(1);
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	);
  const { data: expiration } = useContractData(contract, );
  const { data: remainingTickets } = useContractData(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractData(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketPrice } = useContractData(contract, "ticketPrice");
  const { data: ticketComission } = useContractData(contract, "ticketComission");

  const {mutateAsync: BuyTickets } = useContractCall(contract, "BuyTickets");


  const handleClick = async () => {
    if (!ticketPrice) return;
    const notificiation = toast.loading("Buying your tickets...");
    try{
      const data = await BuyTickets({
        value: ethers.utils.parseEther(
          (Number.(ethers.utils.formatEther(ticketPrice)) * quantity).toString()
        ),
      });

    }catch(err){
      toast.error("Whoops something went wrong!",{
        id: notificiation,
      });
      console.error("contract call failure",err);
    }

  }


	if (isLoading) return <Loading />;
	if (!address) return <Login />;

	return (
		<div className="bg-[#091B18] min-h-screen flex flex-col">
			<Head>
				<title>group2project</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

      <div className="flex-1">
        <Header />
			  <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
				  <div className="stats-container">
					  <h1 className="text-5xl text-white font-semibold text-center">
						  The Next Draw
					  </h1>
					  <div className="flex justify-between p-2 sapce-x-2">
						  <div className="stats">
							  <h2 className="text-sm">Total Pool</h2>
							  <p className="text-xl">
                  {currentWinningReward && ethers.utils.formatEther(
                    currentWinningReward.toString()
                    )}{" "}
                  {currency}
                </p>
						  </div>
						  <div className="stats">
							  <h2 className="text-sm">Tickets Remaining</h2>
							  <p className="text-xl">{remainingTickets?.toNumber()}</p>
						  </div>
					  </div>

					  {/* countdown Timer*/}
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
				  </div>

				  <div className="stats-container space-y-2">
					  <div className="stats-container">
						  <div className="flex justify-between items-center text-white pb-2">
							  <h2>Price per ticket</h2>
							  <p>
                  {ticketPrice && ethers.utils.formatEther(
                    ticketPrice.toString()
                    )}{" "}
                  {currency}
                </p>
						  </div>
						  <div className="flex text-white items-center space-x-2 bg-[#091B18] border-[#004337] border p-4">
							  <p>TICKETS</p>
							  <input
								  className="flex w-full bg-transparent text-right outline-none"
								  type="number"
								  min={1}
								  max={10}
								  value={quantity}
								  onChange={(e) => setQuantity(parseInt(e.target.value))}
							  />
						  </div>

						  <div className="space-y-2 mt-5">
							  <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
								  <p>Total cost of tickets</p>
								  <p>
                    {ticketPrice && Number(ethers.utils.formatEther(
                      ticketPrice.toString()) 
                      ) * quantity}{" "}
                    {currency}
                  </p>
							  </div>
							  <div className="flex items-center justify-between text-emerald-300 text-xs italic">
								  <p>Service fees</p>
								  <p>
                    {ticketComission && ethers.utils.formatEther(
                      ticketComission.toString()
                      )}{" "}
                    {currency}
                  </p>
							  </div>
							  <div className="flex items-center justify-between text-emerald-300 text-xs italic">
								  <p>+ Network Fees</p>
								  <p>TBC</p>
							  </div>
						  </div>
						  <button 
              disabled={expiration?.toString() < Date.now().toString || remainingTickets?.toNumber === 0}
              onClick={handleClick}
              className="mt-5 w-full bg-gradient-to-br from-orange-500 to to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed">
							  Buy tickets
						  </button>
					  </div>
				  </div>
			  </div>
			</div>
		</div>
	);
};

export default Home;
