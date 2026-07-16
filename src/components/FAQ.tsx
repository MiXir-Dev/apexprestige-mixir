import { useState } from "react";
import {
  DEFAULT_HOME_COPY,
  HomeFaqItem,
} from "@/consts/service-area-content";

interface FAQProps {
  introParagraph?: string;
  items?: HomeFaqItem[];
}

const FAQ = ({
  introParagraph = DEFAULT_HOME_COPY.faqIntro,
  items = DEFAULT_HOME_COPY.faqItems,
}: FAQProps) => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-medium">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Questions fréquentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {introParagraph}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {items.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-brand-blue transition-transform duration-300 ${openItem === index ? "transform rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openItem === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="p-5 border-t border-gray-200 bg-white">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
