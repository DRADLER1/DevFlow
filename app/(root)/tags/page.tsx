import TagCard from "@/components/cards/TagCard";
import Pagination from "@/components/shared/Pagination";
import Filters from "@/components/shared/filters/Filters";
import NoResult from "@/components/shared/notResults/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";
import { SearchParamsProps } from "@/types";
import React from "react";

const Tags = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name..."
          otherClasses="flex-1"
        />

        <Filters
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px] "
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks lke there are no tags found"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result ? result.isNext : false}
      />
    </>
  );
};

export default Tags;
