"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  itemsId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}
const Votes = ({
  type,
  itemsId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemsId),
      path: pathname,
    });
    return toast({
      title: `Question ${!hasSaved ? 'Saved in' : 'Removed from'} your Collection`,
      variant : !hasSaved ? 'default' : 'destructive'
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please logIn",
        description: "You need to be logged in to vote",
      })
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemsId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemsId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }


      return toast({
        title: `Upvote ${!hasupVoted ? 'Successful' : 'Removed'}`,
        variant : !hasupVoted ? 'default' : 'destructive'
      });
    }

    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemsId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemsId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }

      //todo : show a toast

      return toast({
        title: `Downvote ${!hasupVoted ? 'Successful' : 'Removed'}`,
        variant : !hasupVoted ? 'default' : 'destructive'
      });
    }
  };


 useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemsId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemsId, userId, pathname, router]);
 

  return (
    <div className="flex gap-5 cursor-pointer">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="upvote"
            width={18}
            height={18}
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="downvote"
            width={18}
            height={18}
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="star"
          width={18}
          height={18}
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
