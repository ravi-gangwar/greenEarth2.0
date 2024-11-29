
"use client";

import { animatePageOut } from "@/animations";
import { useRouter } from "next/navigation";


export default function TransitionLink({
    href,
    label,
}: {
    href: string;
    label: string;
}) {
    const router = useRouter();

    const handleClick = () => {
        animatePageOut(href, router);
    };

    return (
        <button
            onClick={handleClick}
        >
            {label}
        </button>
    );
}
