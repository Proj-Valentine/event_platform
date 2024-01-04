// import CategoryFilter from "@/components/shared/CategoryFilter";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  // Pass search text as a param to get all matching events

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });
  return (
    <>
      <section className=" bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Elevate Your Events: Unite, Engage, and Celebrate with Us!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Join our global community and gain invaluable insights from over
              50,000 mentors from top-tier companies. Your journey to success
              starts here.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Events</Link>
            </Button>
          </div>
          <figure>
            <Image
              src="/assets/images/hero3.jpg"
              alt="hero"
              width={1500}
              height={1000}
              className="max-h-[70vh] rounded-md object-center object-cover w-full 2xl:max-h-[50vh]"
            />
          </figure>
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Globally Trusted <br /> Events hosting platform
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
