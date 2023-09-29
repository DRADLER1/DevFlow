import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../tag/RenderTag";

const hotQuestions = [
  {
    _id: 1,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    _id: 2,
    title: "Can I get the course for free?",
  },
  {
    _id: 3,
    title: "Redux Toolkit Not Updating State as Expected",
  },
  {
    _id: 4,
    title: "How do I use express as a custom server in NextJS?",
  },
  {
    _id: 5,
    title: "Async/Await Function Not Handling Errors Properly",
  },
];

const popularTags = [
  { _id: 1, name: "javascript", totalQuestion: 5 },
  { _id: 2, name: "react", totalQuestion: 2 },
  { _id: 3, name: "next", totalQuestion: 3 },
  { _id: 4, name: "html", totalQuestion: 1 },
  { _id: 5, name: "css", totalQuestion: 6 },
];

const RightSideBar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border fixed right-0 top-0 flex h-screen w-[350px] flex-col  overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden ">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((ques) => (
            <Link
              href={`/questions/${ques._id}`}
              key={ques._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{ques.title}</p>
              <Image
                src="assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestion={tag.totalQuestion}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
