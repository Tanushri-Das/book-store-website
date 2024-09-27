import Container from "@/components/Container";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import useChoose from "@/hooks/useChoose";
import Image from "next/image";

const Choose = () => {
  const { data: chooseData } = useChoose();
  return (
    <>
      <Container>
        <h1 className="text-4xl text-center font-bold mb-4">Why Choose Us</h1>
        <p className="text-[16px] text-[#737373] text-center dark:font-semibold w-full md:w-2/4 mx-auto">
          We curate a diverse collection of books, offering exceptional customer
          service and expert recommendations to enhance your reading experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {chooseData?.map((data) => (
            <Card
              key={data._id}
              className="shadow-lg rounded-lg overflow-hidden py-3"
            >
              <div className="flex justify-center items-center">
                <Image
                  src={data.image}
                  alt={data.title}
                  width={120}
                  height={120}
                  className="object-cover"
                />
              </div>
              <CardContent className="p-0">
                <CardTitle className="text-xl font-semibold text-center pt-4">
                  {data.title}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Choose;
