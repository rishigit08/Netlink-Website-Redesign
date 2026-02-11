import Navbar from "@/components/Navbar";
import Hero, { HeroStats } from "@/components/Hero";
import ConnectedEnterprise from "@/components/ConnectedEnterprise";
import IndustryDepth from "@/components/IndustryDepth";
import CaseStudies from "@/components/CaseStudies";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroStats />
        <ConnectedEnterprise />
        <IndustryDepth />
        <CaseStudies />
        <Philosophy />
      </main>
      <Footer />
    </>
  );
}
