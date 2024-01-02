"use client";
import JobCard from "@/components/cards/JobCard";
import Filters from "@/components/shared/filters/Filters";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./loading";
import { URLProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

const Page = ({ searchParams }: URLProps) => {
  const [countryFilter, setCountryFilter] = useState([]);
  const [allJobsArray, setAllJobsArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Noida , India");


  const fetchCountries = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/all?fields=name`);
      const country = await res.json();
      const countryNames = country.map((i: any) => ({
        name: i.name.common,
        value: i.name.common,
      }));
      setCountryFilter(countryNames);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      const res = await fetch("http://ip-api.com/json/");
      const currentLocation = await res.json();
      setLocation(`${currentLocation.city} , ${currentLocation.country}`);
      console.log(currentLocation.country);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: `Web developer in ${location}`,
          page: "3",
          num_pages: "3",
        },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "d3c09291fbmsh3d9ee73cd6d00d7p163b0bjsne3e429b59222",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };

      const jobs = await axios.request(options);
      const jobsData = await jobs.data.data;
      const jobsArray = jobsData.map((i: any) => ({
        id: i.job_id,
        jobTitle: i.job_title,
        jobDescription: i.job_description,
        companyLogo: i.employer_logo,
        jobType: i.job_employment_type,
        minSalary: i.job_min_salary,
        jobLink: i.job_apply_link,
        jobCity: i.job_city,
        jobState: i.job_state,
        jobCountry: i.job_country,
      }));
      setAllJobsArray(jobsArray);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
    fetchCountries();
  }, []);

  //   const skipAmount = (page - 1) * pageSize;
  // const isNext = totalQuestions > skipAmount + questions.length;

  // useEffect(() => {
  //   fetchJobs();
  // }, [searchParams]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />

        <Filters
          filters={countryFilter}
          otherClasses="min-h-[56px] sm:min-w-[170px] "
        />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {allJobsArray.map((i: any) => (
          <JobCard
            key={i.id}
            jobTitle={i.jobTitle}
            jobDescription={i.jobDescription}
            companyLogo={i.companyLogo}
            jobType={i.jobType}
            minSalary={i.minSalary}
            jobLink={i.jobLink}
            jobCity={i.jobCity}
            jobState={i.job_state}
            jobCountry={i.jobCountry}
          />
        ))}
      </section>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={true}
      />
    </>
  );
};

export default Page;
