import Home from "@/components/Home/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Nest | Home",
  description: "This is home page",
};

const HomePage = () => {
  return (
    <div className="text-black dark:text-white min-h-screen">
      <Home />
    </div>
  );
};

export default HomePage;
