import BenefitsOfUse from "@/components/BenefitsOfUse/BenefitsOfUse";
import MainPage from "@/components/MainPage/MainPage";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <MainPage />
      <BenefitsOfUse />
      {/* কিভাবে কাজ করবে আমাদের এই ঔষধ  */}
      {/* এই ওষুধে কি কি উপকার আপনার হবে  */}
      {/* এই ওষুধে কি কি অউপকার আপনার হবে  */}
      {/* ওষুধে সম্পর্কে  অভিমত */}
      {/* সচরাচর জানতে চাওয়া প্রশ্নের উত্তর */}
    </>
  );
}
