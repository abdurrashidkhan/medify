import connectMongodb from "@/lib/mongodb";
import products from "@/models/productsSchema";
import books from "@/models/productsSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    productName,
    title,
    productPrice,
    deliveryCharges,
    discount,
    orderNumber,
    description,
    date,
    thumbnail,
    lgImage,
    smImage,
  } = await request.json();
  const data = {
    productName,
    title,
    productPrice,
    deliveryCharges,
    discount,
    orderNumber,
    description,
    date,
    thumbnail,
    lgImage,
    smImage,
  };
  await connectMongodb();
  await products.create(data);
  return NextResponse.json({
    message: "data upload success",
    status: true,
    status: 200,
  });
}
export async function GET(request) {
  await connectMongodb();
  const allBooks = await products.find({}).catch();
  // console.log(allUser)
  return NextResponse.json({ allBooks });
}
