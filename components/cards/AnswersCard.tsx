import { getTimestamp, formatNumber } from "@/lib/utils";
import Metric from "../shared/metric/Metric";
import Link from "next/link";

interface Props {
  _id: string;
  title: string;
  author: { _id: string; name: string; picture: string };
  upVotes: string[];
  createdAt: Date;
  clerkId?: string;
}

const AnswersCard = ({
  _id,
  title,
  clerkId,
  author,
  upVotes,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>

          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {/** If signed in add edit delte actions */}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3 ">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` • asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumber(upVotes.length)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default AnswersCard;
