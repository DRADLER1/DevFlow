import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/notResults/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { IQuestion } from "@/database/question.model";
import { getQuestions } from "@/lib/actions/question.action";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import React from "react";

const Page = async ({ params, searchParams }) => {
  const result = await getQuestionsByTagId({tagId : params.id ,  page : 1 , searchQuery : searchParams.q});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions && result.questions.length > 0 ? (
            result.questions.map((question: IQuestion) => (
            <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upVotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
            />
            ))
        ) : (
            <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
            />
        )}
      </div>
    </>
  );
};

export default Page;