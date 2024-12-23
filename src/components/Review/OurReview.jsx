import reviewSvg from "@/images/svg/undraw_review_ofim.svg";
import Image from "next/image";
import OurReviewSlider from "./OurReviewSlider";
import "./style.css";
export default function OurReview() {
  return (
    <section className="container mx-auto px-2 py-10">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-5">
          <div className="">
            <div className="">
              <div className="w-[98%] sm:w-[50%] h-auto mr-auto ml0 mx-auto ">
                <Image className="w-full" src={reviewSvg} alt="loading"></Image>
              </div>
              <div className="px-4 pt-5 ">
                <h1 className="text-3xl font-medium pb-6 sm:pb-0">
                  <strong className="text-4xl font-semibold text-slate-800">
                    সম্মানীত
                  </strong>{" "}
                  গ্রাহকদের অভিমত
                </h1>
                <p className="pt-5">
                  আমাদের পণ্য ও সেবার মান নিয়ে সম্মানিত গ্রাহকদের মূল্যবান মতামত
                  ও অভিজ্ঞতা। আমরা প্রতিটি মন্তব্যকে গুরুত্ব দিয়ে বিবেচনা করি,
                  যাতে আপনাদের সন্তুষ্টি নিশ্চিত করতে পারি।
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <OurReviewSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
