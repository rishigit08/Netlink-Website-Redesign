import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ConnectedEnterprise from "@/components/ConnectedEnterprise";
import IndustryDepth from "@/components/IndustryDepth";
import CaseStudies from "@/components/CaseStudies";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import BlogPOV from "@/components/BlogPOV";
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
        <Services />
        <BlogPOV />
      </main>
      <Footer />
    </>
  );
}
