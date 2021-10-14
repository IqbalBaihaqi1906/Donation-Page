import React from 'react'
import image from "../images/ilustration.png"

function Success() {
    return (
        <div className="flex justify-center items-center w-full bg-gradient-to-r from-green-400 to-blue-400">
            <div>
                <h1 className="text-6xl p-4 font-semibold text-center">THANK YOU FOR YOUR DONATION</h1>
                <p className="font-thin text-center text-2xl">Your Donation Has Been Submitted !</p>
                <div className="h-full flex justify-center w-full">
                    <img className="p-5 rounded-lg h-auto" src={image} alt="..." />
                </div>
            </div>
        </div>
    )
}

export default Success
