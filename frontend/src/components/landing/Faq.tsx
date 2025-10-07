import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  items?: FaqItem[];
}

const Faq = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "faq-1",
      question: "What is OOTDuck?",
      answer:
        "OOTDuck is a progressive web app built by students at York University who had interests in fashion but had issues thinking of what to wear everyday. OOTDuck aims to make students lives easier for deciding on their outfit of the day.",
    },
    {
      id: "faq-2",
      question: "How do I use OOTDuck?",
      answer:
        "Create an account for OOTDuck and upload more than 2 clothing pieces to fully utilize the randomizing feature. ",
    },
    {
      id: "faq-3",
      question: "What does OOTDuck do?",
      answer:
        "OOTDuck allows you to upload clothing, have access to a built in digital closet, randomize clothes, and filter through them.",
    },
    {
      id: "faq-4",
      question: "How is image processing handled?",
      answer:
        "All image analysis is handled through a pre-trained python model that has been configured to receive the type of clothing, colour, and season.",
    },
    {
      id: "faq-5",
      question: "I made a mistake in my name, how do I change it?",
      answer:
        "Your name can be changed in the settings page of your account on the personal tab.",
    },
  ],
}: FaqProps) => {
  return (
    <section id="faqs" className="mx-auto py-32">
      <div className="flex max-w-3xl flex-col items-center justify-center">
        <h1 className="mb-4 text-center font-semibold sm:text-3xl md:mb-11 md:text-3xl xl:text-5xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem className="w-[50vw]" key={index} value={`item-${index}`}>
              <AccordionTrigger className="hover:no-underline lg:text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
