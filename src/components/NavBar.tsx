import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaLock } from "react-icons/fa";

type NavTypes = {
  linkName: string;
  pathname: string;
};

const navlinks: NavTypes[] = [
  { linkName: "Home", pathname: "/" },
  { linkName: "Plants", pathname: "/plants" },
  { linkName: "Garden", pathname: "/garden" },
  { linkName: "Orders", pathname: "/orders" },
  { linkName: "About", pathname: "/about" },
  { linkName: "Contact us", pathname: "/contactus" },
];

function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);

  const handleRestrictedLink = (path: string) => {
    if (!user.token && (path === "/garden" || path === "/orders")) {
      router.push(`/auth/login?callback=${path}`);
      return;
    }
    router.push(path);
  };

  const totalQuantity = cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="z-50 w-full h-20 flex items-center justify-between px-5 bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]">
      <div>
        <Image
          src="/greenearth.svg"
          width={200}
          height={200}
          className="absolute top-0 left-0"
          alt="logo"
        />
      </div>
      <div>
        <ul className="text-white gap-6 hidden lg:flex">
          {navlinks.map((nav, index) => {
            const isRestricted =
              !user.token &&
              (nav.pathname === "/garden" || nav.pathname === "/orders");
            return (
              <li
                key={index}
                onClick={() => handleRestrictedLink(nav.pathname)}
                className={`${
                  nav.pathname === pathname
                    ? "text-blue font-bold"
                    : isRestricted
                    ? "text-yellow-800/50"
                    : "text-yellow-800"
                } cursor-pointer relative`}
              >
                {nav.linkName}
                {isRestricted && (
                  <FaLock className="absolute -top-2 -right-4 text-xs" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center gap-10">
        <div className="lg:hidden">
          <MobileMenu />
        </div>
        <Link
          href={"/cart"}
          className="hidden text-blue font-bold lg:flex relative"
        >
          <div className="relative">
            <FaShoppingCart
              size={30}
              className="hidden text-blue font-bold rounded-full lg:flex"
            />
            <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalQuantity}
            </span>
          </div>
        </Link>
        {user.token ? (
          <Link
            href="/profile"
            className="hidden lg:flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-blue font-bold">{user.name}</span>
          </Link>
        ) : (
          <Link
            href={"/auth/login"}
            className="hidden text-blue font-bold lg:flex"
          >
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

const MobileMenu = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const handleRestrictedLink = (path: string) => {
    if (!user.token && (path === "/garden" || path === "/orders")) {
      router.push(`/auth/login?callback=${path}`);
      return;
    }
    router.push(path);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <RiMenu3Line size={30} className="text-blue" />
      </DrawerTrigger>

      <DrawerContent className="p-4 bg-gradient-to-t from-[#30664B] to-[rgba(27,207,147,0.25)] items-center">
        <ul className="mt-5 flex flex-col gap-4">
          {navlinks.map((nav, index) => {
            const isRestricted =
              !user.token &&
              (nav.pathname === "/garden" || nav.pathname === "/orders");
            return (
              <li
                key={index}
                onClick={() => handleRestrictedLink(nav.pathname)}
                className={`font-bold text-center text-zinc-50 px-5 rounded-md text-lg cursor-pointer bg-blue relative ${
                  isRestricted ? "opacity-50" : ""
                }`}
              >
                {nav.linkName}
                {isRestricted && (
                  <FaLock className="absolute -top-2 -right-4 text-xs" />
                )}
              </li>
            );
          })}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default NavBar;
