"use client";
import CTASection from "@/components/home/CTA-section";
import FAQSection from "@/components/home/faq-section";
import HomeVideoBackground from "@/components/home/home-video-background";
import MeetMeSection from "@/components/home/meet-me-section";
import StatsSection from "@/components/home/stats-section";
import WelcomeSection from "@/components/home/welcome-section";
import { ScrollShadow } from "@nextui-org/react";

export default function Home() {
  return (
    <main className=" h-full ">
      <ScrollShadow className="w-full h-full " hideScrollBar>
        <div className="relative">
          <WelcomeSection />

          <HomeVideoBackground />
        </div>
        <div className="bg-[url('/image/white-space.png')]  bg-repeat bg-auto w-full h-full bg-center	">
          <div className="container py-24 mx-auto md:px-6 ">
            <StatsSection />
            <CTASection />
            <MeetMeSection />
            <FAQSection />
          </div>
        </div>
      </ScrollShadow>
    </main>
  );
}
