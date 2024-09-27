import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useDynamicTitle = () => {
  const pathname = usePathname();

  useEffect(() => {
    let title = "Book Nest";
    if (pathname === "/books") {
      title += " | Books";
    } else if (pathname === "/my-wishlists") {
      title += " | My Wishlist";
    } else if (pathname === "/my-bookings") {
      title += " | My Bookings";
    }
    document.title = title;
  }, [pathname]);
};

export default useDynamicTitle;
