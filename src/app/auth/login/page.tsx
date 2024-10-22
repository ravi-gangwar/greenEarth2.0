"use client"
import Image from 'next/image'
import React from 'react'
import { useWindowSize } from 'usehooks-ts'

function Login() {
    const { width, height } = useWindowSize();
    return (
        <div className='flex h-[100vh] w-[100vw] bg-gradient-to-r from-[rgba(48,102,75,1)] to-[rgba(48,102,75,0.3169)]'>
            <div className='w-[50%]'>
                <Image src={'/yellowTree.svg'} width={width} height={height} alt='tree' />
            </div>
            <div className='w-[50%] flex justify-center items-center flex-col'>
                <Image src={'/greenearth.svg'} width={300} height={300} alt='logo' />
                Login
            </div>
        </div>
    )
}

export default Login