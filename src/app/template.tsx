"use client";

import { animatePageIn } from "@/animations";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";


export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        animatePageIn();
    }, []);

    return (
        <div>
            <div
                id="transition-element"
                className="w-screen min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] z-100 fixed top-0 left-0"
            ></div>
            <NavBar />
            {children}
        </div>
    );
}