import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";
import Filters from "@/components/shared/filters/Filters";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const Community = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />

        <Filters
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px] "
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4" >
        {result.users.length > 0 ? (
          result.users.map((user) => (
            <UserCard key={user._id} user={user}  />
            
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center ">
            <p>No Users Yet</p>
            <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
              Join to be the First
            </Link>
          </div>
        )}
      </section>

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result ? result.isNext : false}
      />
    </>
  );
};

export default Community;
