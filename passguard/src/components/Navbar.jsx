import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
        <div className="mycontainer flex justify-around items-center h-14 px-4 py-5">
            <div className="logo font-bold text-white text-2xl">
              <span className='text-green-500'>&lt;</span>
              Pass
              <span className='text-green-500'>Guard/&gt;</span>
              </div>
            {/* <ul>
                <li className='flex gap-4 text-white'>
                    <a className='hover:font-bold' href='#'>Home</a>
                    <a className='hover:font-bold' href='#'>About</a>
                    <a className='hover:font-bold' href='#'>Contact</a>
                </li>
            </ul> */}
            <button className='text-white bg-green-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1'> 
                <img className='invert  w-10 p-1' src="/icons/github.svg" alt="github logo" />
                <a href='https://github.com/Rushaln7' target='_blank'>
                <span className='font-bold px-2'>GitHub</span>
              </a>
            </button>
        </div>
    </nav>
  )
}

export default Navbar