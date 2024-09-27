import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Container from "../Container";

const Faq = () => {
  return (
    <>
      <Container>
        <h1 className="text-4xl font-bold text-center mb-6">FAQ</h1>
        <p className="text-[16px] text-[#737373] text-center dark:font-semibold w-full md:w-2/4 mx-auto">
          Here are some common questions and answers about our bookstore
          services.
        </p>
        <div className="w-10/12 md:w-3/4 mx-auto mt-10">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:no-underline">
                What types of books do you sell?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                We offer a wide variety of books including fiction, non-fiction,
                academic textbooks, self-help, and children&apos;s books.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg hover:no-underline">
                Do you offer international shipping?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                Yes, we do offer international shipping. The delivery time may
                vary depending on the destination country.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg hover:no-underline">
                How can I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                Once your order is dispatched, you will receive a tracking
                number via email that allows you to track the status of your
                shipment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg hover:no-underline">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                We accept returns within 30 days of purchase as long as the
                books are in their original condition. Please contact customer
                service for more details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg hover:no-underline">
                Do you offer any membership discounts?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                Yes, we offer a membership program where you can earn points on
                purchases and get discounts on future orders.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </>
  );
};

export default Faq;
