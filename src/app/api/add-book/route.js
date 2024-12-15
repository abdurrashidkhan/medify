import connectMongodb from "@/lib/mongodb";
import books from "@/models/booksSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    bookName,
    title,
    contentDurations,
    contentType,
    catagories,
    displaySection,
    contentSubtitles,
    director,
    cast,
    freeOrPaid,
    description,
    video,
    smImage,
    lgImage
  } = await request.json();
  const data = {
    bookName,
    title,
    contentDurations,
    contentType,
    catagories,
    displaySection,
    contentSubtitles,
    director,
    cast,
    freeOrPaid,
    description,
    video,
    smImage,
    lgImage
  };
  await connectMongodb();
  await books.create(data);
  return NextResponse.json({
    message: "data upload success",
    status: true,
    status: 200,
  });
}
export async function GET(request) {
  await connectMongodb();
  const allBooks = await books.find({}).catch();
  // console.log(allUser)
  return NextResponse.json({ allBooks });
}
