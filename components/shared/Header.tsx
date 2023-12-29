import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white">   
        <div className="flex items-center justify-center">
            <img src="/assets/images/logo.png" alt="logo" className="h-10 w-10 mr-2" />
            <span className="font-semibold text-xl tracking-tight">Evently</span>
        </div>
        <div className="flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Sign In
            </button>
        </div>
    </header>
   
  )
}

export default Header
