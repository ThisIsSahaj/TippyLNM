import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Calendar } from "lucide-react";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, editorPosts] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="uppercase px-6 py-3 font-work-sans font-extrabold text-black sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5 mt-32">
          {post.title}
        </h1>
        <p className="font-medium text-[20px] text-black max-w-2xl text-center break-words">
          {post.description}
        </p>
      </section>

      <section className="section_container -mt-4">
        <div>
          <Image
            src={post.image || "/placeholder.svg"}
            alt="thumbnail"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        <div>
          <div className="space-y-5 mt-2 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
              <Link
                href={`/user/${post.author?._id}`}
                className="flex gap-2 items-center mb-3"
              >
                <Image
                  src={post.author.image}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />

                <div>
                  <p className="text-20-medium">{post.author.name}</p>
                  <p className="text-16-medium !text-black-300">
                    @{post.author.username}
                  </p>
                </div>
              </Link>

              <div className="flex flex-col items-start gap-3">
                <span className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">{post.category}</span>

                  <div className="flex items-center">

                  <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-400 rounded-lg ">
                    <Calendar />
                  </div>
                  <div className="ms-3 text-sm font-normal">{formatDate(post?._createdAt)}</div>
                  </div>
                

              </div>
            </div>

            <h3 className="text-30-bold">Pitch Details</h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-words text-justify"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                  WebkitHyphens: "auto",
                  MozHyphens: "auto",
                  msHyphens: "auto",
                }}
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </div>

          <hr className="divider" />

          {editorPosts?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold">Editor Picks</p>

              <ul className="mt-7 card_grid-sm">
                {editorPosts.map((post: StartupTypeCard, i: number) => (
                  <StartupCard key={i} post={post} />
                ))}
              </ul>
            </div>
          )}

          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Page;
