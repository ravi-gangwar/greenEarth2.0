import React from 'react';
import { Ultra as UltraFont } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Balancer from 'react-wrap-balancer'

const ultra = UltraFont({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

function LandingPage() {
    const router = useRouter();

    const handleRedirectToPlant = () => {
        router.push('/plants')
    }

    return (
        <div className='flex items-center w-[100vw] flex-col bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]'>
            <div className='flex min-w-[100%] items-center justify-center flex-col mt-20'>
                <Balancer>
                    <h1 className={`${ultra.className} text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-yellow-800 text-center`}>
                        Plant Trees at <br /> Your <span className='text-blue'>Desired Location</span>
                    </h1>
                </Balancer>
                <p className='text-sm lg:text-md font-bold text-zinc-600 text-center px-10'>
                    Choose your favorite tree, select a location, and watch it grow. Care plans and progress updates ensure your tree
                    thrives, making the planet greener one tree at a time.
                </p>
            </div>
            <button onClick={handleRedirectToPlant} className='bg-yellow-700 mb-10 text-yellow-100 py-3 font-bold mt-10 px-10 rounded-sm sm:text-2xl text-3xl rounded-bl-full rounded-tr-full cursor-pointer'>Get Started</button>
            <Image className='object-cover hidden sm:flex' src={"/whitewave.svg"} alt='wave' width={10000} height={10} />
        </div>
    );
}

export default LandingPage;
