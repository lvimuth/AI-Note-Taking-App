import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfURL =
//   "https://formal-chihuahua-918.convex.cloud/api/storage/0166f45c-8645-4170-9e2a-acf208cfffb3";
export async function GET(req) {
  const requestURL = req.url;
  const { searchParams } = new URL(requestURL);
  const pdfURL = searchParams.get("pdfURL");


  //1. Load the pdf file
  const response = await fetch(pdfURL);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContext = "";
  docs.forEach((doc) => {
    pdfTextContext = pdfTextContext + doc.pageContent;
  });

  // 2. Split the TExt into Small Chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContext]);

  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  return NextResponse.json({ result: splitterList });
}
