"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import CheckAdmin from "@/components/Admin/CheckAdmin";
import CheckingUser from "@/components/Admin/checkingUser";
import insertProducts from "@/database/insert/insertProducts";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import './style.css';
export default function AddBook() {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, outLoading, OutError] = useSignOut(auth);
  const checkingUsers = CheckingUser(); // call checking user function

  const [newCategory, setNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    CheckAdmin(user, signOut);
  }, [user, signOut]);
  // console.log(newCategory)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      const lgImageFile = data.lgImage[0];
      const smImageFile = data.smImage[0];
      const thumbnailFile = data.thumbnail[0];
      let thumbnail = "";
      let smImageUrl = "";
      let lgImageUrl = "";

      if (thumbnailFile) {
        formData.append("file", thumbnailFile);
        formData.append("upload_preset", "images_preset"); // Update with your preset name
        const imageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/digb8ogls/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        if (imageResponse.secure_url) {
          thumbnail = imageResponse.secure_url;
        } else {
          throw new Error("Image upload failed");
        }
      }
      if (lgImageFile) {
        formData.append("file", lgImageFile);
        formData.append("upload_preset", "images_preset"); // Update with your preset name
        const imageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/digb8ogls/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        if (imageResponse.secure_url) {
          lgImageUrl = imageResponse.secure_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      if (smImageFile) {
        formData.append("file", smImageFile);
        formData.append("upload_preset", "images_preset"); // Update with your preset name
        const imageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/digb8ogls/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        if (imageResponse.secure_url) {
          smImageUrl = imageResponse.secure_url;
          // console.log(lgImage);
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Example of project data including uploaded URLs
      const insertData = {
        productName: data.productName,
        title: data.title,
        productPrice: data.productPrice,
        deliveryCharges: data.deliveryCharges,
        discount: data.discount,
        orderNumber: data.orderNumber,
        description: data.description,
        date: new Date(),
        thumbnail: thumbnail,
        lgImage: lgImageUrl,
        smImage: smImageUrl,
        // downloadUrl: data.downloadUrl, 
      };
      console.log(insertData)
      // Handle form submission logic here (e.g., save to database)

      const book = await insertProducts(insertData, setIsLoading, reset);
      // reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || outLoading) {
    return <Loading />;
  }

  if (error || OutError) {
    console.error(error?.message || OutError?.message);
  }

  return (
    <div className="w-[98%] h-auto mb-5">
      <div
        id="project-content"
        className="rounded bg-[#fff] text-[#000] shadow-2xl mb-[4rem]"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center md:text-start">
            <h1 className="text-2xl font-serif pt-4 pl-5">Add Book</h1>
          </div>
          <div className="p-4 text-start">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
              <div className="w-full">
                <label htmlFor="productName">Product Name</label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-[#1f296100]   mt-2"
                  placeholder="enter product name"
                  {...register("productName", {
                    required: {
                      value: true,
                      message: "book name is required",
                    },
                  })}
                />
                {errors.productName && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.productName.message}
                  </span>
                )}
              </div>
              {/* Title */}
              <div className="w-full">
                <label htmlFor="title">Product Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-[#1f296100]   mt-2"
                  placeholder="Type Here Product Title"
                  {...register("title", {
                    required: {
                      value: true,
                      maxLength: 60,
                      message:
                        "Title is required and should be less than 60 characters",
                    },
                  })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 pt-3">
              <div className="w-full">
                <label htmlFor="productPrice">Product Price</label>
                <input
                  id="productPrice"
                  name="productPrice"
                  type="number"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="Type Product Price"
                  {...register("productPrice", {
                    required: {
                      value: true,
                      message: "Product Price is required",
                    },
                  })}
                />
                {errors.productPrice && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.productPrice.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="discount">Product Discount</label>
                <input
                  id="discount"
                  name="discount"
                  type="number"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="type content durations"
                  {...register("discount", {
                    required: {
                      value: true,
                      message: "content durations is required",
                    },
                  })}
                />
                {errors.discount && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.discount.message}
                  </span>
                )}
              </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 mt-3">
              <div className="w-full">
                <label htmlFor="deliveryCharges">
                  Delivery Charges
                  {/* <span className="text-sm text-slate-600"> (optional)</span> */}
                </label>
                <input
                  id="deliveryCharges"
                  name="deliveryCharges"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="Type Delivery Charges"
                  {...register("deliveryCharges", {
                    required: {
                      value: true,
                      message: "content Subtitles is required",
                    },
                  })}
                />
                {errors.deliveryCharges && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.deliveryCharges.message}
                  </span>
                )}
              </div>
              <div className="w-full ">
                <label htmlFor="orderNumber">Number For Customer</label>
                <input
                  id="orderNumber"
                  name="orderNumber"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="Number For Customer"
                  {...register("orderNumber", {
                    required: {
                      value: true,
                      message: "What number should the customer contact?",
                    },
                  })}
                />
                {errors.orderNumber && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.orderNumber.message}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="pt-3">
              <label htmlFor="description">Description</label>
              <textarea
                cols="10"
                rows="5"
                id="description"
                name="description"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                placeholder="Type Here Product Description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* download url */}
            {/* <div className="pt-3">
              <label htmlFor="downloadUrl"> Video download URL</label>
              <input
                id="downloadUrl"
                name="downloadUrl"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                placeholder="enter your download video url"
                {...register("downloadUrl", {
                  required: {
                    value: true,
                    message: "enter your download video url",
                  },
                })}
              />
              {errors.downloadUrl && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.downloadUrl.message}
                </span>
              )}
            </div> */}
            {/* Video */}

            {/* Image */}
            <div className="pt-3">
              <label htmlFor="lgImage"> Thumbnail  </label>
              <input
                id="lgImage"
                name="lgImage"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                {...register("lgImage", {
                  required: {
                    value: true,
                    message: "Thumbnail is required",
                  },
                })}
              />
              {errors.lgImage && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.lgImage.message}
                </span>
              )}
            </div>
            <div className="pt-3">
              <label htmlFor="thumbnail"> Thumbnail  (optional)</label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                {...register("thumbnail", {
                  required: {
                    value: false,
                    message: "Thumbnail is required",
                  },
                })}
              />
              {errors.thumbnail && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.thumbnail.message}
                </span>
              )}
            </div>
            {/* Image */}
            <div className="pt-3">
              <label htmlFor="smImage">Thumbnail (optional)</label>
              <input
                id="smImage"
                name="smImage"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                {...register("smImage", {
                  required: {
                    value: false,
                    message: "Thumbnail is required",
                  },
                })}
              />
              {errors.smImage && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.smImage.message}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`uppercase bg-blue-700 w-full py-2 text-white hover:bg-blue-600 rounded-b ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span> uploading...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
