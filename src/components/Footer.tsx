import Image from 'next/image';
import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className='w-full pt-10 bg-gradient-to-t from-[#30664b]/80 via-[#30664b]/50'>
            {/* Logo Section */}
            <div className='flex items-center justify-center mb-6'>
                <Image src="/greenearth.svg" width={150} height={50} alt="Green Earth Logo" />
            </div>

            {/* Description */}
            <p className='text-sm md:text-lg text-blue-900 text-center max-w-[80%] md:max-w-[60%] mx-auto mb-6 px-4'>
                This is my semester&apos;s mini project, my own idea to plant trees and minimize pollution. This project allows you to order trees to plant, select a location, and opt for yearly or monthly plans for tree care. You can monitor the growth of your tree through pictures and videos.
            </p>


            {/* Social Icons */}
            <div className='flex justify-center items-center gap-6 mb-8'>
                <FaTwitter size={24} className="cursor-pointer hover:text-blue-500 transition" />
                <FaLinkedin size={24} className="cursor-pointer hover:text-blue-500 transition" />
                <FaGithub size={24} className="cursor-pointer hover:text-gray-700 transition" />
                <FaInstagram size={24} className="cursor-pointer hover:text-pink-500 transition" />
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-gray-800 mb-8 text-sm text-center">
                {/* Links Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Links</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Home</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">About Us</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Services</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Contact</a></li>
                    </ul>
                </div>

                {/* Community Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Community</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Forums</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Events</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Blog</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">News</a></li>
                    </ul>
                </div>

                {/* Resources Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Resources</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Documentation</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Tutorials</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">API Reference</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Support</a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Note */}
            <p className='text-gray-700 text-center text-sm pb-6'>
                &copy; {new Date().getFullYear()} Ravi Gangwar. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
