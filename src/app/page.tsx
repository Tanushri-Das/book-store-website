import Container from "@/components/Container";
import FeaturedBooksPage from "@/components/Featured/page";

const HomePage = () => {
  return (
    <div className="text-black dark:text-white min-h-screen">
      <Container>
        <h2 className="text-2xl font-semibold mb-3">
          This is my home page
        </h2>
        <FeaturedBooksPage/>
      </Container>
    </div>
  );
};

export default HomePage;
