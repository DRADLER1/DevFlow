import Image from "next/image";
import Link from "next/link";

interface Props {
  jobTitle: string;
  jobDescription: string;
  companyLogo: string;
  jobType: string;
  minSalary: string;
  jobLink: string;
  jobCity: string;
  jobState: string;
  jobCountry: string;
}

const JobCard = ({
  jobTitle,
  jobDescription,
  companyLogo,
  jobType,
  minSalary,
  jobLink,
  jobCity,
  jobState,
  jobCountry,
}: Props) => {
  return (
    <section className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <div className="flex w-full justify-end sm:hidden">
        <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
          <Image
            src="/assets/icons/avatar.svg"
            alt="Company Image"
            width={50}
            height={50}
          />
          <p className="body-medium text-dark400_light700">
            {jobCity}, {jobState}, {jobCountry}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Image
          src={
            companyLogo !== null ? companyLogo : "/assets/images/site-logo.svg"
          }
          alt="default site logo"
          width={64}
          height={64}
        />
      </div>

      <div className="w-full">
        <div className="flex-between flex-wrap gap-2">
          <p className="base-semibold text-dark200_light900">{jobTitle}</p>
          <div className="hidden sm:flex">
            <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
              <Image
                src="/assets/icons/avatar.svg"
                alt="Company Image"
                width={16}
                height={16}
              />
              <p className="body-medium text-dark400_light700">
                Nashville, TN, US
              </p>
            </div>
          </div>
        </div>

        <p className="body-regular text-dark500_light700  mt-2 line-clamp-2">
          {jobDescription}
        </p>
        <div className="flex-between mt-8 flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/clock-2.svg"
                alt="clock"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">{jobType}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/currency-dollar-circle.svg"
                alt="clock"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">
                {minSalary !== null ? minSalary : "Not Disclosed"}
              </p>
            </div>
          </div>
          <Link
            href={jobLink}
            target="_blank"
            className="flex items-center gap-2"
          >
            <p className="body-semibold primary-text-gradient">View Job</p>
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobCard;