import React from 'react';
import Flex from './ui/Flex';
import { Overlock } from 'next/font/google';

const overlock = Overlock({
    subsets: ['latin'],
    weight: '900',
});

function OtherInformationPage() {
    return (
        <Flex className='relative bg-[#F3F4F5] w-full justify-center top-[-10vh]'>
            <Flex className='items-end'>
                <Flex className='md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[250px] xl:h-[400px] xl:w-[350px] bg-[#FBE024] rounded-tl-[100px] items-center justify-center flex-col'>
                    <h1 className={`${overlock.className} text-zinc-700 text-3xl`}>
                        Secure Payments
                    </h1>
                    <p className={`${overlock.className} text-zinc-700 text-md text-center`}>Confidence on your all devices</p>
                </Flex>
                <Flex className='md:h-[200px] md:w-[550px] lg:h-[250px] lg:w-[700px]  xl:h-[350px] xl:w-[800px] bg-blue rounded-tr-2xl justify-evenly items-center'>
                    <Flex className='flex-col'>
                        <h1 className={`${overlock.className} text-zinc-50 text-5xl text-center`}>
                            Free Delivery
                        </h1>
                        <p className={`${overlock.className} text-zinc-50 text-md text-center`}>Free all orders above 500rs</p>
                    </Flex>
                    <Flex className='flex-col'>
                        <h1 className={`${overlock.className} text-zinc-50 text-5xl text-center`}>
                            30 Days Retruns
                        </h1>
                        <p className={`${overlock.className} text-zinc-50 text-md text-center`}>Only for pro users</p>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default OtherInformationPage;
