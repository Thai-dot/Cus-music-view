import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

import { Link as LinkIcon } from "lucide-react";
import { Link } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function FAQSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h1 className="text-primary mb-10">Frequently asked questions</h1>

      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Is this website free?"
          classNames={{
            indicator: "text-primary",
          }}
        >
          Yes is it 😁
        </AccordionItem>
        <AccordionItem
          className="mt-6 "
          key="2"
          aria-label="Accordion 2"
          title="This website is owned by who?"
          classNames={{
            indicator: "text-primary",
          }}
        >
          Nguyễn Hoàng Thái.
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/Thai-dot"
            anchorIcon={<LinkIcon />}
            className="pl-2"
          >
            Github Page
          </Link>
        </AccordionItem>
        <AccordionItem
          key="3"
          className="mt-6"
          aria-label="Accordion 3"
          title="What kind of music type do I allow to upload?"
          classNames={{
            indicator: "text-primary",
          }}
        >
          All music genres that you like. But be aware of copyrighted music!
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
