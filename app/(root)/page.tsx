import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { HeroVideoDialogDemo } from "./../../components/VideoBox";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  // console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="w-full min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex justify-center items-center flex-col py-10 px-6">
       
        <div className="md:mt-20 flex flex-col justify-center">

        <h1 className="heading">
          Tip Your Favorite Content <br />
          Creators and Get Noticed
        </h1>

        <p className="sub-heading mb-4">
          Submit Posts, Get Noticed, and Get Tipped
        </p>
        </div>

        <HeroVideoDialogDemo />
        {/* <SearchForm query={query} /> */}
      </section>

      <section className="section_container flex flex-col">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Posts"}
        </p>

        <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No posts found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
