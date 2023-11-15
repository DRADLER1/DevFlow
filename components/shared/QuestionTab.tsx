import page from "@/app/(root)/collection/page";
import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  searchParams: any;
  userId: string;
  clerkId?: string | null;
}
const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId ? clerkId : "  "}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upVotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result ? result.isNext : false}
      />
    </>
  );
};

export default QuestionTab;
