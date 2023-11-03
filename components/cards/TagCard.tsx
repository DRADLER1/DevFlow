import Link from "next/link";
import React from "react";

interface Props {
  tag: {
    _id: string;
    name: string;
    questions: string[];
  };
}

const TagCard = ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone "
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
        <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5 capitalize ">
          <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
        </div>
        <p className="small-regular text-dark500_light700 mt-4">
          JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS
        </p>
        <p className="small-medium text-dark400_light500 mt-3.5">
            <span className="body-semibold primary-text-gradient mr-2.5">{tag.questions.length} + </span> Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
