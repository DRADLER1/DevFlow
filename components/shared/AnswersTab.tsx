import { SearchParamsProps } from "@/types";
import { getUserAnswers } from "@/lib/actions/user.action";
import AnswersCard from "../cards/AnswersCard";

interface Props extends SearchParamsProps {
  searchParams: any;
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId, page: 1 });
  return (
    <>
      {result.answers.map((answer) => (
        <AnswersCard
          key={answer._id}
          _id={answer.question._id}
          clerkId={clerkId ? clerkId : "  "}
          title={answer.question.title}
          author={answer.author}
          createdAt={answer.createdAt}
          upVotes={answer.upvotes}
        />
      ))}
    </>
  );
};

export default AnswersTab;
