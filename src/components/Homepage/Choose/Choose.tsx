import Container from "@/components/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Choose = () => {
  const cardData = [
    {
      id: 1,
      image:
        "https://w7.pngwing.com/pngs/11/946/png-transparent-quality-control-computer-icons-quality-assurance-quality-miscellaneous-service-logo-thumbnail.png",
      title: "Best Quality",
    },
    {
      id: 2,
      image:
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/24-7-services-3230455-2690928.png",
      title: "24/7 Support",
    },
    {
      id: 3,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/013/695/803/small_2x/customer-satisfaction-icon-style-free-vector.jpg",
      title: "Customer Satisfaction",
    },
    {
      id: 4,
      image:
        "https://cdn0.iconfinder.com/data/icons/business-and-finance-4-11/100/line-98-512.png",
      title: "Expert Team",
    },
  ];
  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-4">Why Choose Us</h1>
      <p className="text-[16px] text-[#737373] text-center dark:font-semibold w-2/4 mx-auto">
        We curate a diverse collection of books, offering exceptional customer
        service and expert recommendations to enhance your reading experience.
      </p>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {cardData.map((card) => (
            <Card
              key={card.id}
              className="shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                src={card.image}
                alt={card.title}
                width={120}
                height={120}
                className="object-cover"
              />
              <CardContent>
                <CardHeader>
                  <CardTitle className="text-fuchsia-800 text-xl font-semibold text-center">
                    {card.title}
                  </CardTitle>
                </CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Choose;
