"use client"
import LandingPage from "@/components/LandingPage";
import NavBar from "../components/NavBar";
import OtherInformationPage from "@/components/OtherInformationPage";

export default function Home() {
  // const { data, isLoading } = trpc.demoRoutes.getTodos.useQuery()
  // console.log(isLoading, data)
  return (
    <main className="">
      <NavBar />
      <LandingPage />
      <OtherInformationPage />
    </main>
  );
}
