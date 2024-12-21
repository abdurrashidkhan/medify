export default function BenefitsOfUse() {
  const benefit = [
    { title: "দ্রুত বীর্যপাত প্রতিরোধ করে এবং বী.র্য ঘণ করবে।" },
    { title: "২০ থেকে ২৫ মিনিট টাইমিং দিবে।" },
    { title: "পৌরুষত্ব ধরে রাখে এবং যৌন মিলনে আগ্রহ বাড়ায়।" },
    { title: "যৌন  শক্তি ভিতর থেকে জাগরিত করে।" },
    { title: "মানসিক চাপ, উদ্বেগ বা দুঃশ্চিন্তা কমাতে সাহায্য করে।" },
    { title: "হরমোন ব্যালেন্স ও বন্ধ্যাত্ব দূরীকরণে সাহায্য করে।" },
    { title: "গো.পনাঙ্গ বেঁকে যাওয়া রোধ করে।" },
    { title: "বিশেষ সময়ে লি.ঙ্গের উত্থান জনিত সমস্যা দূর করবে।" },
    { title: "শুক্রা-ণুর সংখ্যা এবং গুণমান উন্নত করবে।" },
    {
      title:
        "আমাদের প্রোডাক্ট কোন ওষুধ না এগুলা প্রাকৃতিক উপাদান।যা সম্পূর্ণ পাশ্বপ্রতিক্রিয়া বিহীন।",
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-2 py-10">
        <div className="text-center pb-5">
          <h1 className="text-3xl font-medium">
            <strong className="text-4xl font-semibold text-slate-800">
              স্যাফরন
            </strong>{" "}
            ব্যবহারের উপকারিতা
          </h1>
          <p className="pt-3 pb-6 text-[19px]">
            এই ঔষধ ব্যবহারে কি কি উপকারিতা পাবেন |
          </p>
        </div>
        <div>
          <ul className="timeline timeline-vertical ">
            {benefit?.map((b, index) => (
              <li>
                <hr className="bg-[#075985]" />
                <div
                  className={
                    index % 2 === 0
                      ? "timeline-start timeline-box  rounded-br-none  text-lg bg-slate-100 border-[#075985] shadow-2xl"
                      : "timeline-end timeline-box  rounded-tl-none text-lg bg-slate-100 border-[#075985] shadow-2xl"
                  }
                >
                  {index % 2 === 0 ? b?.title : b?.title}
                </div>
                <hr className="bg-[#075985]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
