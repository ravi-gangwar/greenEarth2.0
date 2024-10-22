import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Image from 'next/image';
import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";

type NavTypes = [
    'Home',
    'Plant',
    'Garden',
    'Orders',
    'Contact us'
]

const navlinks: NavTypes = ['Home', 'Plant', 'Garden', 'Orders', 'Contact us'];

function NavBar() {

    return (
        <nav className='z-50 w-full h-20 flex items-center justify-between px-5 bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]'>
            <div>
                <Image src="/greenearth.svg" width={200} height={200} className='absolute top-0 left-0' alt='logo' />
            </div>
            <div>
                <ul className='text-white gap-6 hidden lg:flex'>
                    {
                        navlinks.map((nav, index) => {
                            return (
                                <li className='text-blue font-bold cursor-pointer' key={index}>{nav}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='flex gap-2 items-center gap-10'>
                <div className='lg:hidden'>
                    <MobileMenu />
                </div>
                <FaShoppingCart size={30} className='hidden text-blue font-bold rounded-full lg:flex' />
                <p className='hidden text-blue font-bold lg:flex '>Login</p>
            </div>
        </nav>
    );
}

const MobileMenu = () => {
    return (
        <Drawer>
            {/* Drawer Trigger */}
            <DrawerTrigger asChild>
                <RiMenu3Line size={30} className='text-blue' />
            </DrawerTrigger>

            {/* Drawer Content */}
            <DrawerContent className='p-4 bg-yellow-200 items-center'>
                {/* Navigation Links */}
                <ul className="mt-5 flex flex-col gap-4">
                    {navlinks.map((nav, index) => (
                        <li key={index} className="font-bold text-center text-zinc-50 px-5 rounded-md text-lg cursor-pointer bg-yellow-700">{nav}</li>
                    ))}
                </ul>
            </DrawerContent>
        </Drawer>
    );
};

export default NavBar;
