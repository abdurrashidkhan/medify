import svg from "@/images/svg/undraw_questions_g2px.svg";
import Image from "next/image";
import "./style.css";
export default function WhyOrderFromUs() {
  const data = [
    {
      title: "গুণগত মানের নিশ্চয়তা",
      description:
        "আমরা সবসময় সেরা মানের পণ্য সরবরাহে প্রতিশ্রুতিবদ্ধ। প্রতিটি পণ্যকে আমরা বিশেষ যত্ন এবং নিখুঁত পরীক্ষার মাধ্যমে আপনাদের হাতে পৌঁছে দিই।",
    },
    {
      title: "বিশ্বাসযোগ্যতা ও স্বচ্ছতা",
      description:
        "আমাদের সাথে কেনাকাটা করলে আপনি পাবেন ১০০% স্বচ্ছ এবং সৎ পরিষেবা। আমরা যা প্রতিশ্রুতি দিই, তা শতভাগ বাস্তবায়ন করি।",
    },
    {
      title: " সাশ্রয়ী মূল্য",

      description:
        "আমরা কেবল মানসম্পন্ন পণ্যই নয়, বাজারের সেরা দামে তা সরবরাহ করার নিশ্চয়তাও দিই।",
    },
    {
      title: "দ্রুত ডেলিভারি",
      description:
        "আমাদের শক্তিশালী ডেলিভারি নেটওয়ার্কের মাধ্যমে আমরা আপনাকে দ্রুততম সময়ে পণ্য সরবরাহ করি।",
    },
    {
      title: "কাস্টমার সাপোর্ট",
      description:
        "আমাদের বিশেষজ্ঞ কাস্টমার কেয়ার টিম সবসময় প্রস্তুত, আপনাদের যেকোনো সমস্যার সমাধান করতে।",
    },
    {
      title: "বিশেষ অফার ও ডিসকাউন্ট",
      description:
        "আমাদের নিয়মিত ডিসকাউন্ট এবং আকর্ষণীয় অফারের মাধ্যমে আপনি আরও সাশ্রয়ী কেনাকাটা করতে পারবেন।",
    },
  ];
  return (
    <section className="py-10" id="whyOrderFromUs">
      <div className=" container mx-auto px-2 ">
        <div className="text-center">
          <h1 className="text-3xl font-medium">
            কেনো আমাদের থেকে{" "}
            <strong className="text-4xl font-semibold text-slate-800">
              অর্ডার{" "}
            </strong>
            করবেন
          </h1>

          <p className="pt-3 pb-6 text-[19px]">
            আমরা সবসময় কাস্টমারের প্রয়োজনকে সর্বোচ্চ গুরুত্ব দিই। আমাদের লক্ষ্য
            আপনাদের সন্তুষ্টি এবং আস্থা অর্জন করা।
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-5">
          {/*  */}
          <div className="w-[98%] sm:w-[70%] h-auto mx-auto">
            <Image className="w-full" src={svg} alt="loading"></Image>
          </div>
          <div className="">
            <ul className="timeline timeline-vertical timeline-compact overflow-y-auto w-full h-[300px] py-5">
              {data?.map((data, index) => (
                <li key={index}>
                  <hr className="bg-[#075985]" />
                  <div className="timeline-middle">
                    {/* <p className="bg-[#075985] p-2 rounded-full py-0 px-[9px] text-[#fff]">
                      {index + 1}
                    </p> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-[25px] w-[25px]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box bg-slate-100 rounded border border-[#07598518] shadow-2xl">
                    <h2 className="text-xl font-semibold text-start text-slate-800">
                      {data?.title}
                    </h2>
                    <p className="text-base text-[#000] pt-2">
                      {data?.description}
                    </p>
                  </div>
                  <hr className="bg-[#075985]" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
