import Image from 'next/image';
import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <div className='w-full pt-10 bg-gradient-to-t from-[#30664b]/[0.76] via-[#30664b]/[0.33]'>
            <div className='flex items-center justify-center mb-5'>
                <Image src="/greenearth.svg" width={200} alt="logo" height={10} />
            </div>
            <p className='text-sm md:text-lg text-blue md:max-w-[60%] text-center mx-auto mb-5'>
                {"This is my semester's mini project, my own idea to plant trees and minimize pollution. This project gives you a way to order your desired tree to plant and location, as well as have some yearly and monthly plans for the care of your planted trees, and you can see your tree's growth in the form of pictures or videos."}
            </p>
            <div className='flex justify-center items-center gap-5 mb-5'>
                <FaTwitter size={20} className="cursor-pointer hover:text-blue-500" />
                <FaLinkedin size={20} className="cursor-pointer hover:text-blue-500" />
                <FaGithub size={20} className="cursor-pointer hover:text-blue-500" />
                <FaInstagram size={20} className="cursor-pointer hover:text-blue-500" />
            </div>
            <div className="flex justify-between md:justify-evenly items-start px-2 text-gray-800 py-5">
                {/* Links Section */}
                <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-bold text-gray-700">Links</h1>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Home</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">About Us</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Services</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Contact</a></li>
                    </ul>
                </div>

                {/* Community Section */}
                <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-bold text-gray-700">Community</h1>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Forums</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Events</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Blog</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">News</a></li>
                    </ul>
                </div>

                {/* Resources Section */}
                <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-bold text-gray-700">Resources</h1>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Documentation</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Tutorials</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">API Reference</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Support</a></li>
                    </ul>
                </div>
            </div>
            <p className='text-zinc-950 text-center font-bold'>All right reversed @ravi gangwar {new Date().getFullYear()}</p>
        </div>
    );
}

export default Footer;
