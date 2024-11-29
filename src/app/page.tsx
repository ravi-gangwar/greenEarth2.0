"use client"
import LandingPage from "@/components/LandingPage";
import PaymentShowcase from "@/components/PaymentShowcase";
import NewArriables from "@/components/NewArriables";
import PopularCollections from "@/components/PopularCollections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
      <LandingPage />
      <PaymentShowcase />
      <PopularCollections />
      <NewArriables />
      <Footer />
    </main>
  );
}
