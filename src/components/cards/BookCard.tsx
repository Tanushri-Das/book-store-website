import { TBook } from "@/types";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BookCard = ({ book }: { book: TBook }) => {
  return (
    <Card>
      <CardHeader className="p-0">
        <div className="w-full h-[210px] rounded-t-lg overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={book.image}
              layout="fill"
              objectFit="cover"
              alt="Service Card"
              className="rounded-t-lg"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl text-center font-semibold">
          {book.book_name}
        </CardTitle>
        <CardDescription className="text-[16px] font-medium text-center my-3">
          {book.writer_name}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-4">
        <h5 className="text-lg text-primary font-semibold">
          Price : ${book.price}
        </h5>
        <Button className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 font-semibold rounded-md text-[16px]">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
