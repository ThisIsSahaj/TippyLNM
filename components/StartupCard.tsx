'use client'
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import TipModal from "./TipModal";
import { useWallet } from "@/hooks/useWallet";
import Ping from "./Ping";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const { isConnected } = useWallet();

  return (
    <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-200">
      <div className="w-full aspect-w-16 aspect-h-10 bg-white rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
        <Link href={`/startup/${_id}`}>
          <img src={image} alt="placeholder"
            className="startup-card_img group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200" />
        </Link>
      </div>

      <div className="flex mt-5 gap-2 px-4">
        <div className="flex w-full gap-4">
          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image!}
              alt={author?.name!}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
          <Link href={`/user/${author?._id}`}>
            <p className="font-semibold line-clamp-1">{author?.name}</p>
            <p className="text-sm text-gray-500">{formatDate(_createdAt)}</p>
          </Link>
        </div>

        <span className="p-2 flex items-center gap-2">
          <EyeIcon className="size-6 text-black" />
          <span className="text-16-medium">{views}</span>
        </span>


      </div>



      <div className="p-4">
        <Link href={`/startup/${_id}`}>
          <h2 className="font-bold mt-2 text-xl text-zinc-700 line-clamp-1">
            {title}
          </h2>
        </Link>


        <h2 className="font-normal my-2 h-10 text-sm text-zinc-500 line-clamp-2">
          {description}
        </h2>


        <div className="flex flex-row justify-between items-center mt-10 mb-1">
          {isConnected && author?.walletAddress && (
            <>
              <button
                onClick={() => setIsTipModalOpen(true)}
                className="flex items-center relative rounded px-5 py-2.5 overflow-hidden group bg-black hover:bg-gradient-to-r hover:from-black hover:to-black/80 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 417">
                  <path d="M127.9 0L127.1 2.7V278.7L127.9 279.5L255.8 208.4L127.9 0Z" />
                  <path d="M127.9 0L0 208.4L127.9 279.5V149.5V0Z" />
                  <path d="M127.9 302.3L127.4 302.9V414.6L127.9 416.3L255.8 232.4L127.9 302.3Z" />
                  <path d="M127.9 416.3V302.3L0 232.4L127.9 416.3Z" />
                  <path d="M127.9 279.5L255.8 208.4L127.9 149.5V279.5Z" />
                  <path d="M0 208.4L127.9 279.5V149.5L0 208.4Z" />
                </svg>
                <span className="relative">Tip Creator</span>
              </button>
            </>
          )}



          {isTipModalOpen && author?.walletAddress && (
            <TipModal
              isOpen={isTipModalOpen}
              onClose={() => setIsTipModalOpen(false)}
              recipientAddress={author.walletAddress}
              startupTitle={title}
            />
          )}

          <Link href={`/startup/${_id}`}>
            <button type="button"
              className="flex items-center relative rounded px-5 py-2.5 overflow-hidden group bg-black hover:bg-gradient-to-r hover:from-black hover:to-black/80 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              Read More
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </Link>
        </div>


      </div>
    </div>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
