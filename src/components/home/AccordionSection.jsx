import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does FeastFlow work?",
    answer:
      "FeastFlow connects you with local home chefs. You simply browse the menu, place an order, and the chef prepares your meal fresh. We then deliver it straight to your doorstep!",
  },
  {
    question: "Is the food prepared fresh?",
    answer:
      "Absolutely! Every meal is cooked to order by passionate home chefs. We prioritize freshness and quality above all else.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes, we have a dedicated delivery team to ensure your food arrives hot and fresh. You can see the estimated delivery time for each meal before you order.",
  },
  {
    question: "Can I become a chef?",
    answer:
      "We'd love to have you! If you have a passion for cooking, simply sign up, request to become a chef from your profile, and once approved, you can start selling your delicious creations.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and secure online payment methods to make your checkout seamless.",
  },
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className={`border border-gray-200 rounded-xl overflow-hidden bg-white ${isOpen ? 'shadow-md ring-1 ring-[#FFE52A]' : 'shadow-sm'}`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors"
      >
        <span className={`text-lg font-semibold ${isOpen ? 'text-[#F79A19]' : 'text-gray-800'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#F79A19]"
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-600 bg-white">
              <div className="pt-2 border-t border-gray-100"></div>
              <p className="pt-4 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function AccordionSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked <span className="text-[#F79A19]">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600"
          >
             Got questions? We've got answers. Here is everything you need to know.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
