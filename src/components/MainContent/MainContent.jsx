import { FaFacebook, FaSquareInstagram, FaTiktok } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";
import product from "../../images/product/saffron.webp";
import "./style.css";
const MainContent = () => {
  return (
    <div className="w-full h-[100vh] sm:h-[60vh] md:h-[100vh] mx-auto relative bg-[#ffffff]">
      <div className="content_center  flex flex-col-reverse lg:flex-row items-center justify-center justify-items-center gap-5 px-5">
        {/* products description */}
        <div className=" ">
          <h2 className="text-2xl pb-2">
            <strong className="text-5xl">20%</strong> Off
          </h2>
          <h1 className="text-4xl text-slate-900 font-semibold">স্যাফরন </h1>
          <p className="py-2 text-base font-medium text-slate-800">
            স্যাফরনে রয়েছে মাল্টিভিটামিন এর ৪৯টি উপাদান এবং বিভিন্ন ফলমূলের
            উপাদান ছাড়া ও আছে জিনসিং, আলকুশি, সাফেদ মুসলি, পানিফল, শিমুল মূল,
            শতমূল, তালমাখনা, মাশরুম, আখরোট, আফ্রিকান খুসিলা, কস্তুরী এর মতো
            মহামূল্যবান বহু উপাদান
          </p>
          <div className="">
            <p className="py-2">আপনার সাথে আমরা আছি |</p>
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/">
                  <FaFacebook className="text-2xl text-blue-700" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaTiktok className="text-2xl " />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaSquareInstagram className="text-2xl text-[#b8113a]" />
                </Link>
              </li>
            </ul>
          </div>
          {/* order */}
          <div className=" mt-6">
            <button className="bg-[#2196F3] text-[#fff] text-2xl rounded px-4 py-1">
              Order Now
            </button>
          </div>
        </div>
        {/* products image */}
        <div className="w-[100%] sm:w-[75%]">
          <Image
            src={product}
            alt="loading"
            placeholder="blur"
            quality={100}
            className="rounded shadow-2xl w-full h-auto  "
          ></Image>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default MainContent;
