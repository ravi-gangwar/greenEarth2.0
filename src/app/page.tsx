"use client"

import LanginPage from "./_components/LandingPage";
import NavBar from "./_components/NavBar";
import OtherInformationPage from "./_components/OtherInformationPage";

export default function Home() {
  return (
    <main className="">
     <NavBar/>
     <LanginPage/>
     <OtherInformationPage/>
    </main>
  );
}
