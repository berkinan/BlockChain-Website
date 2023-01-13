import React from 'react'
import NavButton from './NavButton'

function Header() {
    return (
        <div>
            <div className='flex items-center space-x-2'>
                <img className="rounded-full h-20 w-20" src='https://i.imgur.com/4h7mAu7.png'/>
                <div>
                    <h1 className='text-lg text-white font-bold'>Blockchain Lottery</h1>
                    <p className='text-sx text-emerald-500 truncate'>User:</p>
                </div>
            </div>
            <div>
                <div className="bg-[#0A1F1C]">
                    <NavButton title='Buy Tickets' />
                    <NavButton title='Logout' />
                </div>
            </div>
        </div>

    )
}

export default Header