"use client";
import Loading from "@/app/loading";
import allProductFind from "@/database/find/allProductFind/allProductFind";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const contentLoad = async () => {
    try {
      const { allProducts } = await allProductFind();
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    contentLoad()
  }, []); // Dependency array is empty to avoid infinite loop
  console.log(products)
  const deleteProject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are sure to delete blog information",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `https://portfolio-2-0-server.vercel.app/blog/${id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.data?.acknowledged) {
              Swal.fire("Deleted!", "Project information has been deleted.", "success");
              setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id)); // Remove deleted product from state
            }
          })
          .catch((error) => console.error("Error deleting product:", error));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Delete Cancelled",
        });
      }
    });
  };

  if (products.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <div className="">
        <h1 className=" text-slate-700">Manage Products</h1>
        <div className="py-5">
          <div className="overflow-x-hidden">
            <table className="table w-full  bg-white table-xs sm:table-sm md:table-md lg:table-lg text-slate-700 rounded shadow-2xl">
              {/* head */}
              <thead>
                <tr className="bg-[#e9e9e9] p-5 border-b">
                  <th className="text-xs sm:text-base capitalize">Id</th>
                  <th className="text-xs sm:text-base capitalize">Product Name</th>
                  <th className="text-xs sm:text-base capitalize">Date</th>
                  <th className="text-xs sm:text-base capitalize">Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#e9e9e998]">
                {products ? products.map((p, index) => (
                  <tr key={p?._id}>
                    <td>{index + 1}</td>
                    <td className="capitalize">{p?.productName}</td>
                    <td>{format(new Date(p?.date), "MM/dd/yyyy")}</td>
                    <td className="flex items-center gap-3">
                      <Link href={`/user/update/${p?._id}`}>
                        <FaEdit className="text-2xl text-[#04bd48]" />
                      </Link>
                      <button onClick={() => deleteProject(p?._id)}>
                        <MdDelete className="text-2xl text-[#c93030]" />
                      </button>
                    </td>
                  </tr>
                )) : <div className="text-center">
                  <h2>No Data Found</h2>
                </div>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
