import React from 'react'

type Props = {
    title:string;
}


function NavButton({ title }:Props) {
  return (
    <button className="bg-[]">
        {title}
    </button>
  )
}

export default NavButton