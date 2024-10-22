import React from 'react';
import NewArriavlsTreeCard from './ui/NewArriavlsTreeCard';
import { Ultra as UltraFont } from 'next/font/google';

// Import Google Font
const ultra = UltraFont({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

function NewArriables() {
    return (
        <div className="flex flex-col justify-center bg-[#F3F4F5]">
            <h1 className={`${ultra.className} text-blue text-lg md:text-3xl font-bold mt-5 mb-5 px-2 underline decoration-wavy`}>
                New Arrivals:
            </h1>

            {/* Desktop view with flex-wrap for multiple cards */}
            <div className="flex flex-nowrap overflow-x-auto md:flex-wrap gap-5 px-2 justify-evenly overflow-y-hidden">
                <NewArriavlsTreeCard pop={false} left={true} />
                <NewArriavlsTreeCard pop={false} />
                <NewArriavlsTreeCard pop={false} right={true} />
                <NewArriavlsTreeCard pop={false} right={true} />
            </div>
        </div>
    );
}

export default NewArriables;
