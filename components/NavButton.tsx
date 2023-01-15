import React from "react";

type Props = {
	title: string;
	isActive?: boolean;
	onClick?: () => void;
};

function NavButton({ title, isActive, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className={`${
				isActive && "bg-[#2d5fa5]"
			} hover:bg-[#2d5fa5] text-white py-2 px-4 rounded font-bold`}
		>
			{title}
		</button>
	);
}

export default NavButton;
