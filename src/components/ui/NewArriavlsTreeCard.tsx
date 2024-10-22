import Image from 'next/image'
import React from 'react'

function NewArriavlsTreeCard({ left, right, pop}: { left?: boolean, right?: boolean, pop: boolean }) {

    return (
        <div className={`w-[200px] md:w-[300px] cursor-pointer flex flex-col items-center justify-center ${pop ? 'bg-[#CBE9D4]' : 'bg-[#F8F0A9]'} ${left ? 'rounded-tl-[80px]' : right ? 'rounded-tr-[80px]' : 'rounded-t-full'}`}>
            <div className='min-h-[80%] min-w-full flex justify-center'>
                <Image src={"/yellowTree.svg"} width={300} height={350} alt="" />
            </div>
            <div className={`w-full h-full flex justify-between bg-blue text-white px-5`}>
                <p className='text-sm py-2 font-bold'>Ravi</p>
                <p className='text-sm py-2 font-bold'>400$</p>
            </div>
        </div>
    )
}

export default NewArriavlsTreeCard;