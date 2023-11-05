import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const Page = async () => {
  const {userId} = auth()

  // const userId = 123456;

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-10">
        <QuestionForm mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default Page;
