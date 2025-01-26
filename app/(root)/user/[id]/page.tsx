import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="flex h-screen justify-center mt-24">

          <div className="max-w-xs">
            <div className="bg-white shadow-xl rounded-lg py-3">
              <div className="photo-wrapper p-2">
                <img className="w-32 h-32 rounded-full mx-auto" src={user.image} alt={user.name}/>
              </div>
              <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.name}</h3>
                <div className="text-center text-gray-400 text-xs font-semibold">
                  <p>@{user?.username}</p>
                </div>
                <table className="text-xs my-3">
                  <tbody><tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Bio</td>
                    <td className="px-2 py-2">{user?.bio}</td>
                  </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                      <td className="px-2 py-2">{user?.email || "No email"}</td>
                    </tr>
                  </tbody></table>
              </div>
            </div>
          </div>

        </div>

        <div className="flex-1 flex flex-col gap-5 mt-20">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
