import React from 'react';
import { Overlock } from 'next/font/google';

const overlock = Overlock({
    subsets: ['latin'],
    weight: '900',
});

function PaymentShowcase() {
    return (
        <section className='relative flex bg-[#F3F4F5] md:mt-0 w-full justify-center w-[100vw   ]'>
            <div className='items-end md:flex'>
                <div className='flex h-[250px] w-[100vw] md:w-[250px] lg:h-[300px] lg:w-[250px] xl:h-[400px] xl:w-[350px] bg-[#FBE024] md:rounded-tl-[100px] items-center justify-center flex-col'>
                    <h1 className={`${overlock.className} text-zinc-700 text-3xl`}>
                        Secure Payments
                    </h1>
                    <p className={`${overlock.className} text-zinc-700 text-md text-center`}>Confidence on your all devices</p>
                </div>
                <div className='flex h-[200px] w-[100vw] md:w-[550px] lg:h-[250px] lg:w-[700px]  xl:h-[350px] xl:w-[800px] bg-blue md:rounded-tr-2xl justify-evenly items-center'>
                    <div className='flex flex-col'>
                        <h1 className={`${overlock.className} text-lg text-zinc-50 md:text-5xl text-center`}>
                            Free Delivery
                        </h1>
                        <p className={`${overlock.className} text-zinc-50 text-md text-center`}>Free all orders above 500rs</p>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className={`${overlock.className} text-lg text-zinc-50 md:text-5xl text-center`}>
                            30 Days Retruns
                        </h1>
                        <p className={`${overlock.className} text-sm text-zinc-50 md:text-md text-center`}>Only for pro users</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PaymentShowcase;
