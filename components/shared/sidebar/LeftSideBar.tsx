"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <Link
            href={item.route}
            key={item.label}
            className={`${
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900"
            } flex items-center justify-start gap-4 bg-transparent p-4`}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className="invert-colors"
            />
            <p className="max-lg:hidden">{item.label}</p>
          </Link>
        );
      })}
    </>
  );
};

const LeftSideBar = () => {
  return (
    <section className=" custom-scrollbar background-light900_dark200 light-border fixed left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        <NavContent/>
      </div>

      
        <SignedOut>
          <div className="flex flex-col gap-3">
            <div>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <Image
                    src="/assets/icons/account.svg"
                    alt="accountImage"
                    width={20}
                    height={20}
                    className=" invert-colors lg:hidden"
                  />
                  <span className="primary-text-gradient max-lg:hidden">
                    Log In
                  </span>
                </Button>
              </Link>
            </div>

            <div>
              <Link href="/sign-up">
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
                  <Image
                    src="/assets/icons/sign-up.svg"
                    alt="accountImage"
                    width={20}
                    height={20}
                    className=" invert-colors lg:hidden"
                  />
                  <span className="max-lg:hidden">Sign Up</span>
                </Button>
              </Link>
            </div>
          </div>
        </SignedOut>
        
    </section>
  );
};

export default LeftSideBar;
