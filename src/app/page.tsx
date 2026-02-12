import Navbar from "@/components/Navbar";
import Hero, { HeroStats } from "@/components/Hero";
import ConnectedEnterprise from "@/components/ConnectedEnterprise";
import IndustryDepth from "@/components/IndustryDepth";
import CaseStudies from "@/components/CaseStudies";
import Philosophy, { PartnershipCTA } from "@/components/Philosophy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ConnectedEnterprise />
        <IndustryDepth />
        <CaseStudies />
        <Philosophy />
        <HeroStats />
        <PartnershipCTA />
      </main>
      <Footer />
    </>
  );
}
