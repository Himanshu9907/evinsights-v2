
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedEVs from "@/components/home/FeaturedEVs";
import BodyTypesSection from "@/components/home/BodyTypesSection";
import BrandsSection from "@/components/home/BrandsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import GuidesSection from "@/components/home/GuidesSection";
import ChargingSection from "@/components/home/ChargingSection";
import MarketInsights from "@/components/home/MarketInsights";
import WhyEVInsights from "@/components/home/WhyEVInsights";
import FinalCTA from "@/components/home/FinalCTA";
// import Footer from "@/components/home/Footer";


import { getSiteSnapshot } from "@/server/services/site.service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const snapshot = await getSiteSnapshot();

    console.log("========== HOME SNAPSHOT ==========");
  console.log("VEHICLES:", snapshot.vehicles);
  console.log("VEHICLE COUNT:", snapshot.vehicles?.length);
  console.log("BRANDS:", snapshot.brands?.length);
  console.log("===================================");


  const marketCount = new Set(
    snapshot.vehicles.flatMap(
      (vehicle) => vehicle?.markets || []
    )
  ).size;

  return (
    <main className="home-page">
      <HeroSection
        vehicleCount={snapshot.vehicles.length}
        brandCount={snapshot.brands.length}
      />

      <StatsSection
        vehicleCount={snapshot.vehicles.length}
        brandCount={snapshot.brands.length}
        marketCount={marketCount}
        contentCount={snapshot.content.length}
      />

      <FeaturedEVs
        vehicles={snapshot.vehicles}
        brands={snapshot.brands}
      />

      <BodyTypesSection />

      <BrandsSection brands={snapshot.brands} />

      <ReviewsSection content={snapshot.content} />

      <GuidesSection />

      <ChargingSection />

      <MarketInsights />

      <WhyEVInsights />

      <FinalCTA />

      {/* <Footer /> */}
    </main>
  );
}