"use client"
import LandingPage from "@/components/LandingPage";
import NavBar from "../components/NavBar";
import PaymentShowcase from "@/components/PaymentShowcase";
import NewArriables from "@/components/NewArriables";
import PopularCollections from "@/components/PopularCollections";
import Footer from "@/components/Footer";
import { trpc } from "./_trpc/client";

export default function Home() {
  const { data, isLoading } = trpc.demoRoutes.getTodos.useQuery()
  console.log(isLoading, data)
  return (
    <main className="">
      <NavBar />
      <LandingPage />
      <PaymentShowcase />
      <PopularCollections/>
      <NewArriables/>
      <Footer/>
    </main>
  );
}
