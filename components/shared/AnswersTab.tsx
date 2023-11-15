import { SearchParamsProps } from "@/types";
import { getUserAnswers } from "@/lib/actions/user.action";
import AnswersCard from "../cards/AnswersCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  searchParams: any;
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {result.answers.map((answer) => (
        <AnswersCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId ? clerkId : "  "}
          title={answer.question.title}
          question={answer.question}
          author={answer.author}
          createdAt={answer.createdAt}
          upVotes={answer.upvotes}
        />
      ))}
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result ? result.isNext : false}
      />
    </>
  );
};

export default AnswersTab;
