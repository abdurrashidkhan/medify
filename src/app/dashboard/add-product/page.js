"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import CheckAdmin from "@/components/Admin/CheckAdmin";
import CheckingUser from "@/components/Admin/checkingUser";
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
      let lgImageUrl = "";
      let smImageUrl = "";

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
        bookName: data.bookName,
        title: data.title,
        contentDurations: data.contentDurations,
        contentType: data.contentType,
        catagories: data.catagories,
        displaySection: data.displaySection,
        contentSubtitles: data.contentSubtitles,
        director: data.director,
        cast: data.cast,
        freeOrPaid: data.freeOrPaid,
        description: data.description,
        date: new Date(),
        lgImage: lgImageUrl,
        smImage: smImageUrl,
        // downloadUrl: data.downloadUrl,
        video: data.video,
      };
      console.log(insertData)
      // Handle form submission logic here (e.g., save to database)

      const book = await insertBooks(insertData, setIsLoading, reset);
      // reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // handel new categories form 
  // Second form setup
  const { register: registerFormTwo, handleSubmit: handleSubmitFormTwo, reset: catagoriesReset, formState: { errors: catagoriesErrors } } = useForm();
  const onSubmitFormTwo = (data) => {
    setNewCategoryName(data?.newCatagories);
    setNewCategory(false)
    catagoriesReset()
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
                <label htmlFor="bookName">Book Name</label>
                <input
                  id="bookName"
                  name="bookName"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-[#1f296100]   mt-2"
                  placeholder="enter book name"
                  {...register("bookName", {
                    required: {
                      value: true,
                      message: "book name is required",
                    },
                  })}
                />
                {errors.bookName && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.bookName.message}
                  </span>
                )}
              </div>
              {/* Title */}
              <div className="w-full">
                <label htmlFor="title">Book Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-[#1f296100]   mt-2"
                  placeholder="Type Here Title"
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
                <label htmlFor="contentDurations">Content Durations</label>
                <input
                  id="contentDurations"
                  name="contentDurations"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="type content durations"
                  {...register("contentDurations", {
                    required: {
                      value: true,
                      message: "content durations is required",
                    },
                  })}
                />
                {errors.contentDurations && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.contentDurations.message}
                  </span>
                )}
              </div>

              <div className="w-full ">
                <label htmlFor="contentType">Content Type</label>
                <select
                  name="contentType"
                  id="contentType"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  {...register("contentType", {
                    required: {
                      value: true,
                      message: "Select content type",
                    },
                  })}
                >
                  <option className="bg-[#fff]" selected disabled>
                    Select Your content Catagories
                  </option>
                  <option className="" value="book">
                    Books
                  </option>
                  <option className="" value="Audio">
                    Audio
                  </option>
                  <option className="" value="drama">
                    Drama
                  </option>
                </select>
                {errors.contentType && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.contentType.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
              <div className="w-full pt-4">
                <label htmlFor="catagories" className=" ">
                  Catagories
                </label>
                <select
                  name="catagories"
                  id="catagories"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  {...register("catagories", {
                    required: {
                      value: true,
                      message: "Select Your content Catagories",
                    },
                  })}
                  onChange={(e) => {
                    if (e.target.value === "Add New Category") {
                      setNewCategory(true);
                      e.target.value = ""; // Reset the select to the default state
                    }
                  }}
                >
                  <option className="" selected disabled>
                    Select Your content Catagories
                  </option>
                  <option className="" value="Passion & Romance">
                    Passion & Romance
                  </option>
                  <option className="" value="Historical Fiction">
                    Historical Fiction
                  </option>
                  {
                    newCategoryName && <option className="" value={newCategoryName}>
                      {newCategoryName}
                    </option>
                  }
                  <option className="" value="Add New Category">
                    Add New Category
                  </option>
                  {/* <option value="sport">Sport</option> */}
                </select>
                <label className="">
                  {errors.catagories?.type === "required" && (
                    <span className="text-red-500 text-sm pt-2 capitalize">
                      {errors.catagories.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="w-full pt-4">
                <label htmlFor="displaySection" className=" ">
                  Where display ?
                </label>
                <select
                  name="displaySection"
                  id="displaySection"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  {...register("displaySection", {
                    required: {
                      value: true,
                      message: "Select Your content display section",
                    },
                  })}
                >
                  <option className="py-2 " selected disabled>
                    Select where to display
                  </option>
                  <option className="py-2 " value="main-banner">
                    Newest
                  </option>

                  {/* <option value="sport">Sport</option> */}
                </select>
                <label className="">
                  {errors.displaySection?.type === "required" && (
                    <span className="text-red-500 text-sm pt-2 capitalize">
                      {errors.displaySection.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 pt-4">
              <div className="w-full">
                <label htmlFor="contentSubtitles">
                  Content Subtitles{" "}
                  <span className="text-sm text-slate-600"> (optional)</span>
                </label>
                <input
                  id="contentSubtitles"
                  name="contentSubtitles"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="type content Subtitles"
                  {...register("contentSubtitles", {
                    required: {
                      value: false,
                      message: "content Subtitles is required",
                    },
                  })}
                />
                {errors.contentSubtitles && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.contentSubtitles.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="director">
                  Director{" "}
                  <span className="text-sm text-slate-600"> (optional)</span>
                </label>
                <input
                  id="director"
                  name="director"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="Who is the director?"
                  {...register("director", {
                    required: {
                      value: false,
                      message: "Who is the director?",
                    },
                  })}
                />
                {errors.director && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.director.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="cast">
                  Cast{" "}
                  <span className="text-sm text-slate-600"> (optional)</span>
                </label>
                <input
                  id="cast"
                  name="cast"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="Who was in the act?"
                  {...register("cast", {
                    required: {
                      value: false,
                      message: "Who was in the act?",
                    },
                  })}
                />
                {errors.cast && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.cast.message}
                  </span>
                )}
              </div>
              <div className="w-full ">
                <label htmlFor="freeOrPaid">Free or Paid</label>
                <select
                  id="freeOrPaid"
                  name="freeOrPaid"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  {...register("freeOrPaid", {
                    required: {
                      value: true,
                      message: "Select Free or Paid",
                    },
                  })}
                >
                  <option value="" className="" disabled>
                    Select here
                  </option>
                  <option value="paid" className="">
                    Paid
                  </option>
                  <option value="free" className="">
                    Free
                  </option>
                </select>
                {errors.freeOrPaid && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.freeOrPaid.message}
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
                placeholder="Type Here project Description"
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
            <div className="pt-3">
              <label htmlFor="video"> Video Preview URL</label>
              <input
                id="video"
                name="video"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                placeholder="enter your video url"
                {...register("video", {
                  required: {
                    value: true,
                    message: "enter your video url",
                  },
                })}
              />
              {errors.video && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.video.message}
                </span>
              )}
            </div>
            {/* Image */}
            <div className="pt-3">
              <label htmlFor="lgImage">Content Thumbnail  (1920 * 1080)</label>
              <input
                id="lgImage"
                name="lgImage"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                {...register("lgImage", {
                  required: {
                    value: true,
                    message: "lgImage is required",
                  },
                })}
              />
              {errors.lgImage && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.lgImage.message}
                </span>
              )}
            </div>
            {/* Image */}
            <div className="pt-3">
              <label htmlFor="smImage">Content Poster (277 * 416) </label>
              <input
                id="smImage"
                name="smImage"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                {...register("smImage", {
                  required: {
                    value: true,
                    message: "Image is required",
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
      {/* add new catagories form  */}
      {
        newCategory && <div className="w-[100vw] h-[100vh] bg-[#0000009d] fixed top-0 left-0  z-[111]" >
          <div className="bg-[#fff] rounded shadow-2xl p-5 w-[95%] sm:w-[30%] h-auto" id="newCatagoriesForm">
            <h2 className="text-center py-3">Add New Catagories</h2>
            <form onSubmit={handleSubmitFormTwo(onSubmitFormTwo)}>
              {/* register your input into the hook by invoking the "register" function */}
              <div className="pt-3">
                {/* <label htmlFor="newCatagories"> Add New Catagories</label> */}
                <input
                  id="newCatagories"
                  name="newCatagories"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="enter your new catagories "
                  {...registerFormTwo("newCatagories", {
                    required: {
                      value: true,
                      message: "enter your new catagories ",
                    },
                  })}
                />
                {catagoriesErrors.newCatagories && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {catagoriesErrors.newCatagories.message}
                  </span>
                )}
              </div>
              <div className=" pt-5">
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
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  );
}
