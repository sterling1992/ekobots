import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Nosotros from "@/components/Nosotros";
import Impact from "@/components/Impact";
import Programs from "@/components/Programs";
import DonateBanner from "@/components/DonateBanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <Impact />
        <Programs />
        <DonateBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
