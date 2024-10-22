import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";

type NavTypes = {
    linkName: string;
    pathname: string;
}

const navlinks: NavTypes[] = [
    { linkName: 'Home', pathname: '/' },
    { linkName: 'Plants', pathname: '/plants' },
    { linkName: 'Garden', pathname: '/garden' }, // Fixed spelling error from 'Gardern'
    { linkName: 'About', pathname: '/about' },
    { linkName: 'Contact us', pathname: '/contactus' }
];

function NavBar() {
    const pathname = usePathname();

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
                                <Link key={index} href={nav.pathname}>
                                    <li className={`${nav.pathname === pathname ? 'text-blue font-bold' : 'text-yellow-800'} cursor-pointer`}>
                                        {nav.linkName}
                                    </li>
                                </Link>
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
                <Link href={'/auth/login'} className='hidden text-blue font-bold lg:flex'>
                    <span>Login</span>
                </Link>
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
            <DrawerContent className='p-4 bg-gradient-to-t from-[#30664B] to-[rgba(27,207,147,0.25)] items-center'>
                {/* Navigation Links */}
                <ul className="mt-5 flex flex-col gap-4">
                    {navlinks.map((nav, index) => (
                        <Link key={index} href={nav.pathname}>
                            <li className="font-bold text-center text-zinc-50 px-5 rounded-md text-lg cursor-pointer bg-blue">
                                {nav.linkName}
                            </li>
                        </Link>
                    ))}
                </ul>
            </DrawerContent>
        </Drawer>
    );
};

export default NavBar;
