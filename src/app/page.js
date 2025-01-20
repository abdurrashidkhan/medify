import BenefitsOfUse from "@/components/BenefitsOfUse/BenefitsOfUse";
import Footer from "@/components/Footer/Footer";
import MainBanner from "@/components/MainBanner/MainBanner";
import Navbar from "@/components/Navbar/Navbar";
import QuestionAndAns from "@/components/QuestionAndAns/QuestionAndAns";
import OurReview from "@/components/Review/OurReview";
import WhyOrderFromUs from "@/components/WhyOrderFromUs/WhyOrderFromUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <MainBanner />
      {/* এই ওষুধে কি কি উপকার আপনার হবে  */}
      <BenefitsOfUse />
      {/* কেনো আমাদের থেকে কেন অর্ডার করবেন */}
      <WhyOrderFromUs />
      {/* সচরাচর জানতে চাওয়া প্রশ্নের উত্তর */}
      <QuestionAndAns />
      <OurReview />
      <Footer />
    </>
  );
}