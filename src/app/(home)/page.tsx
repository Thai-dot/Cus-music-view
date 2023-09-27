"use client";
import FAQSection from "@/components/home/faq-section";
import HomeVideoBackground from "@/components/home/home-video-background";
import WelcomeSection from "@/components/home/welcome-section";
import { ScrollShadow } from "@nextui-org/react";

export default function Home() {
  return (
    <main className=" h-full">
      <ScrollShadow className="w-full h-full " hideScrollBar>
        <div className="relative">
          <WelcomeSection />

          <HomeVideoBackground />
        </div>
        <div>
          <FAQSection />
        </div>
      </ScrollShadow>
    </main>
  );
}
