"use client"
import { handleLogin } from '@/server/controllers/authControllers';
import Image from 'next/image'
import React from 'react'
import { useWindowSize } from 'usehooks-ts'

function Login() {
    const { width, height } = useWindowSize();


    return (
        <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-evenly h-[100vh] w-[100vw]  bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]'>
            <div className='w-[70%] lg:w-[50%] flex items-center justify-center'>
                <Image src={'/greenearth.svg'} width={width} height={height} alt='logo' />
            </div>
            <div className='w-[90%] w-[50%] flex justify-center items-center flex-col'>
                <form action="" onSubmit={handleLogin} className="w-full max-w-sm mx-auto bg-blur p-6 rounded-lg shadow-md">
                    <h1 className='text-blue font-bold text-3xl'>Login</h1>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Login"
                            name="submit"
                            className="w-full bg-blue-500 cursor-pointer bg-blue font-bold text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login