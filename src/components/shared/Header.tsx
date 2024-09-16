"use client";
import Container from "@/components/Container";
import { ThemeToggler } from "@/components/ThemeToggler";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigation = [
    { title: "Home", href: "/" },
    { title: "Books", href: "/books" },
    { title: "About", href: "/about" },
    { title: "Login", href: "/login" },
    { title: "My Cart", href: "/my-cart" },
  ];

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
          <div className="flex items-center gap-x-5 font-semibold text-lg">
            {navigation?.map((item) => (
              <Link key={item?.title} href={item?.href}>
                {item?.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right: Theme Toggler (Visible on all screens) */}
        <div className="flex-grow flex justify-center lg:flex-grow-0 lg:relative">
          <ThemeToggler />
        </div>

        {/* Right: Menu Icon (Visible only on small to medium screens) */}
        <div className="lg:hidden">
          <button onClick={toggleDrawer}>
            <FiMenu className="text-2xl" /> {/* Menu icon stays the same */}
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
            {navigation.map((item) => (
              <Link key={item?.title} href={item?.href} onClick={toggleDrawer}>
                {item?.title}
              </Link>
            ))}
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
