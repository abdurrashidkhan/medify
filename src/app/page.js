import BenefitsOfUse from "@/components/BenefitsOfUse/BenefitsOfUse";
import MainPage from "@/components/MainPage/MainPage";
import Navbar from "@/components/Navbar/Navbar";
import WhyOrderFromUs from "@/components/WhyOrderFromUs/WhyOrderFromUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <MainPage />
      {/* এই ওষুধে কি কি উপকার আপনার হবে  */}
      <BenefitsOfUse />
      {/* কেনো আমাদের থেকে কেন অর্ডার করবেন */}
      <WhyOrderFromUs />
      {/* সচরাচর জানতে চাওয়া প্রশ্নের উত্তর */}
    </>
  );
}
