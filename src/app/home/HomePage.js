import React from "react";
import Header from "./Header";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

function HomePage() {
  const { user } = useUser();
  return (
    <div>
      <Header />
      <div>
        {/* <img src={'/grid.svg'} className="absolute z-[-10] w-full" 
    width={1200} height={300} /> */}
        {/* <Header/> */}
        <section className=" z-50">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:pb-1 lg:px-12">
            <a
              href="#"
              className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              role="alert"
            >
              <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">
                New
              </span>{" "}
              <span className="text-sm font-medium">AI PDF Note Taker</span>
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Take Your PDF Notes <span className="text-primary">With AI</span>{" "}
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Effortlessly capture, organize, and enhance your PDF notes with
              our AI-powered note-taking tool. Transform your study sessions,
              work documents, and personal notes with precision and
              intelligence, allowing you to focus on what matters most.
            </p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Link
                href={user ? "/dashboard" : "/sign-in"}
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get Started
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
              {/* <a
                href="https://youtu.be/Q5LM985yUmQ"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                <svg
                  className="mr-2 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                Watch video
              </a> */}
            </div>
          </div>
        </section>
        <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:pt-2 lg:px-12">
          <h2 className="font-bold text-3xl">How it Works?</h2>
          <h2 className="text-md text-gray-500">
            Experience the simplicity of AI-powered note-taking in just 3 easy
            steps. Streamline your workflow, save time, and get organized
            effortlessly.
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border bg-white
       border-gray-200 p-8 shadow-xl transition
       hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className="h-8 w-8" />

              <h2 className="mt-4 text-xl font-bold text-black">
                Upload Your PDF Document
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Simply upload your PDF file, and let our AI do the heavy
                lifting. Within seconds, the AI scans and understands the
                document’s content, preparing it for insightful interaction. No
                matter the complexity, from textbooks to research papers, we’ve
                got you covered.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className="h-8 w-8" />

              <h2 className="mt-4 text-xl font-bold text-black">
                Ask Questions, Get Instant AI Insights{" "}
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Have a question about the content? Just ask! Our AI-powered
                assistant is ready to provide accurate, context-based answers
                directly from the document. Whether it’s a quick summary, a
                detailed breakdown, or answers to specific queries, our AI
                simplifies complex information, transforming your document into
                an interactive knowledge source.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className="h-8 w-8" />

              <h2 className="mt-4 text-xl font-bold text-black">
                Save Your Notes for Future Reference
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Once you’ve gathered insights, save your notes effortlessly.
                Organize, store, and revisit your notes anytime, ensuring your
                key takeaways are just a click away. With easy export and
                sharing options, your notes stay accessible and ready for when
                inspiration or information strikes.
              </p>
            </a>
          </div>

          {/* <div className="mt-12 text-center">
            <a
              href="/sign-in"
              className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </a>
          </div> */}
        </section>
      </div>
    </div>
  );
}

export default HomePage;
