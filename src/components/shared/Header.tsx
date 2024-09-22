"use client";
import Container from "@/components/Container";
import { ThemeToggler } from "@/components/ThemeToggler";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import logo from "@/assets/logo.png";
import { useSession, signOut } from "next-auth/react";
import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();

  // Use custom hooks and rename variables to avoid conflicts
  const { data: cartData, isLoading: isCartLoading } = useCart();
  const { data: wishlistData, isLoading: isWishlistLoading } = useWishlist();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="dark:text-gray-200 border-b-[1px] border-black/80 dark:border-b-white/20">
      <Container className="py-2 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-lg font-bold lg:flex-grow-0">
          <Link href="/">
            <Image src={logo} width={80} height={80} alt="logo" />
          </Link>
        </div>

        {/* Center: Navigation (Hidden on small screens) */}
        <nav className="hidden lg:flex lg:inset-0 lg:justify-center lg:items-center">
          <div className="flex items-center gap-x-8 font-semibold text-lg">
            {/* Hardcoded Navigation Links */}
            <Link href="/" className="text-lg">
              Home
            </Link>
            <Link href="/books" className="text-lg">
              Books
            </Link>
            <Link href="/about" className="text-lg">
              About
            </Link>
            {session ? (
              <>
                <Link href="/my-bookings" className="text-lg">
                  <button className="btn relative">
                    <FaShoppingCart className="text-lg mt-2" />
                    {isCartLoading ? (
                      <p className="text-lg">Loading...</p>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-black text-white absolute top-[-10px] left-[10px] flex items-center justify-center dark:bg-transparent dark:border dark:border-gray-300">
                        <p className="text-[16px]">
                          {cartData?.mybookings?.length || 0}
                        </p>
                      </div>
                    )}
                  </button>
                </Link>

                <Link href="/my-wishlists" className="text-lg">
                  <button className="btn relative">
                    <FaBell className="text-lg mt-2" />
                    {isWishlistLoading ? (
                      <p className="text-lg">Loading...</p>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-black text-white absolute top-[-10px] left-[9px] flex items-center justify-center dark:bg-transparent dark:border dark:border-gray-300">
                        <p className="text-[16px]">
                          {wishlistData?.mywishlists?.length || 0}
                        </p>
                      </div>
                    )}
                  </button>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-md text-white text-lg px-4 py-[6px] font-medium bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300 ms-3"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md text-white text-lg bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Right: Theme Toggler (Visible on all screens) */}
        <div className="flex-grow flex justify-center lg:flex-grow-0 lg:relative">
          <ThemeToggler />
        </div>

        {/* Right: Menu Icon (Visible only on small to medium screens) */}
        <div className="lg:hidden">
          <button onClick={toggleDrawer}>
            <FiMenu className="text-2xl" />
          </button>
        </div>

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 transition-transform transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } w-[200px] z-50`}
        >
          {/* Close Icon inside Drawer, positioned to the right */}
          <div className="flex justify-end p-4">
            <button onClick={toggleDrawer}>
              <FaXmark className="text-2xl" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex flex-col gap-y-4 p-5 font-semibold text-lg lg:text-[16px]">
            {/* Hardcoded Drawer Links */}
            <Link href="/" onClick={toggleDrawer}>
              Home
            </Link>
            <Link href="/books" onClick={toggleDrawer}>
              Books
            </Link>
            <Link href="/about" onClick={toggleDrawer}>
              About
            </Link>
            {session ? (
              <>
                <Link
                  href="/my-bookings"
                  className="text-lg"
                  onClick={toggleDrawer}
                >
                  <button className="btn relative">
                    <FaShoppingCart className="text-lg mt-2" />
                    {isCartLoading ? (
                      <p className="text-lg">Loading...</p>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-black text-white absolute top-[-10px] left-[10px] flex items-center justify-center dark:bg-transparent dark:border dark:border-gray-300">
                        <p className="text-[16px]">
                          {cartData?.mybookings?.length || 0}
                        </p>
                      </div>
                    )}
                  </button>
                </Link>

                <Link
                  href="/my-wishlists"
                  className="text-lg"
                  onClick={toggleDrawer}
                >
                  <button className="btn relative">
                    <FaBell className="text-lg mt-2" />
                    {isWishlistLoading ? (
                      <p className="text-lg">Loading...</p>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-black text-white absolute top-[-10px] left-[9px] flex items-center justify-center dark:bg-transparent dark:border dark:border-gray-300">
                        <p className="text-[16px]">
                          {wishlistData?.mywishlists?.length || 0}
                        </p>
                      </div>
                    )}
                  </button>
                </Link>
                <button
                  onClick={() => {
                    toggleDrawer(); // Close the drawer
                    signOut();
                  }}
                  className="rounded-md text-center text-white text-lg bg-fuchsia-800 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium w-28"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={toggleDrawer}
                className="rounded-md text-center text-white text-lg bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium w-24"
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Overlay */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleDrawer}
          ></div>
        )}
      </Container>
    </header>
  );
};

export default Header;
