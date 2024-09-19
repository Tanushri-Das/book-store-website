// "use client";
// import Container from "@/components/Container";
// import { ThemeToggler } from "@/components/ThemeToggler";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { FiMenu } from "react-icons/fi";
// import { FaShoppingCart } from "react-icons/fa";
// import { FaXmark } from "react-icons/fa6";
// import logo from "@/assets/logo.png";
// import { useSession, signOut } from "next-auth/react";
// import { useQuery } from "@tanstack/react-query";

// const Header = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const { data: session } = useSession();

//   const {
//     data: cartData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["myBookings", session?.user?.email],
//     queryFn: () =>
//       fetch(`/my-bookings/api/${session?.user?.email}`).then((res) =>
//         res.json()
//       ),
//     enabled: !!session?.user?.email,
//   });

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <header className="dark:text-gray-200 border-b-[1px] border-black/80 dark:border-b-white/20">
//       <Container className="py-2 flex items-center justify-between">
//         {/* Left: Logo */}
//         <div className="text-lg font-bold lg:flex-grow-0">
//           <Link href="/">
//             <Image src={logo} width={80} height={80} alt="logo" />
//           </Link>
//         </div>

//         {/* Center: Navigation (Hidden on small screens) */}
//         <nav className="hidden lg:flex lg:inset-0 lg:justify-center lg:items-center">
//           <div className="flex items-center gap-x-5 font-semibold text-lg">
//             {/* Hardcoded Navigation Links */}
//             <Link href="/" className="text-lg">
//               Home
//             </Link>
//             <Link href="/books" className="text-lg">
//               Books
//             </Link>
//             <Link href="/about" className="text-lg">
//               About
//             </Link>
//             {session ? (
//               <>
//                 <Link href="/my-bookings" className="text-lg">
//                   <button className="btn relative">
//                     <FaShoppingCart className="text-lg" />
//                     {isLoading ? (
//                       <p>Loading...</p>
//                     ) : (
//                       <div className="absolute top-[-2px] right-[15px]">
//                         <p className="text-lg">
//                           {cartData?.mybookings?.length || 0}
//                         </p>
//                       </div>
//                     )}
//                   </button>
//                 </Link>
//                 <button
//                   onClick={() => signOut()}
//                   className="rounded-md text-white text-lg bg-sky-400 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
//                 >
//                   LogOut
//                 </button>
//               </>
//             ) : (
//               <Link
//                 href="/login"
//                 className="rounded-md text-white text-lg bg-sky-400 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </nav>

//         {/* Right: Theme Toggler (Visible on all screens) */}
//         <div className="flex-grow flex justify-center lg:flex-grow-0 lg:relative">
//           <ThemeToggler />
//         </div>

//         {/* Right: Menu Icon (Visible only on small to medium screens) */}
//         <div className="lg:hidden">
//           <button onClick={toggleDrawer}>
//             <FiMenu className="text-2xl" />
//           </button>
//         </div>

//         {/* Drawer */}
//         <div
//           className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 transition-transform transform ${
//             isDrawerOpen ? "translate-x-0" : "-translate-x-full"
//           } w-[200px] z-50`}
//         >
//           {/* Close Icon inside Drawer, positioned to the right */}
//           <div className="flex justify-end p-4">
//             <button onClick={toggleDrawer}>
//               <FaXmark className="text-2xl" />
//             </button>
//           </div>

//           {/* Drawer Navigation */}
//           <nav className="flex flex-col gap-y-4 p-5 font-semibold text-lg lg:text-[16px]">
//             {/* Hardcoded Drawer Links */}
//             <Link href="/" onClick={toggleDrawer}>
//               Home
//             </Link>
//             <Link href="/books" onClick={toggleDrawer}>
//               Books
//             </Link>
//             <Link href="/about" onClick={toggleDrawer}>
//               About
//             </Link>
//             {session ? (
//               <>
//                 <Link href="/dashboard" onClick={toggleDrawer}>
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={() => {
//                     toggleDrawer(); // Close the drawer
//                     signOut();
//                   }}
//                   className="rounded-md text-white text-lg bg-sky-400 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
//                 >
//                   LogOut
//                 </button>
//               </>
//             ) : (
//               <Link
//                 href="/login"
//                 onClick={toggleDrawer}
//                 className="rounded-md text-white text-lg bg-sky-400 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
//               >
//                 Login
//               </Link>
//             )}
//           </nav>
//         </div>

//         {/* Overlay */}
//         {isDrawerOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 z-40"
//             onClick={toggleDrawer}
//           ></div>
//         )}
//       </Container>
//     </header>
//   );
// };

// export default Header;

"use client";
import Container from "@/components/Container";
import { ThemeToggler } from "@/components/ThemeToggler";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import logo from "@/assets/logo.png";
import { useSession, signOut } from "next-auth/react";
import useCart from "@/hooks/useCart"; // Import the custom hook

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const { data: cartData, isLoading, error } = useCart(); // Use the custom hook

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
                    <FaShoppingCart className="text-lg" />
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <div className="absolute top-[-2px] right-[15px]">
                        <p className="text-lg">
                          {cartData?.mybookings?.length || 0}
                        </p>
                      </div>
                    )}
                  </button>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-md text-white text-lg bg-sky-400 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md text-white text-lg bg-sky-400 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
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
                <Link href="/dashboard" onClick={toggleDrawer}>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    toggleDrawer(); // Close the drawer
                    signOut();
                  }}
                  className="rounded-md text-white text-lg bg-sky-400 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={toggleDrawer}
                className="rounded-md text-white text-lg bg-sky-400 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium"
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
