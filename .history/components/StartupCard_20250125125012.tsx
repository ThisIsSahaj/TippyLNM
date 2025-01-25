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

  console.log('Full author data:', author);
  console.log('Debug:', {
    isConnected,
    authorWallet: author?.walletAddress,
    authorId: author?._id,
    authorEmail: author?.email
  });

  return (

    // <li className="startup-card group">
    //   <div className="flex-between">
    //     <p className="startup_card_date">{formatDate(_createdAt)}</p>
    //     <div className="flex gap-1.5">
    //       <EyeIcon className="size-6 text-primary" />
    //       <span className="text-16-medium">{views}</span>
    //     </div>
    //   </div>

    //   <div className="flex mt-5 gap-5">
    //     <div className="flex-1">
    //       <Link href={`/user/${author?._id}`}>
    //         <p className="text-16-medium line-clamp-1">{author?.name}</p>
    //       </Link>
    //       <Link href={`/startup/${_id}`}>
    //         <h3 className="text-26-semibold line-clamp-1">{title}</h3>
    //       </Link>
    //     </div>
    //     <Link href={`/user/${author?._id}`}>
    //       <Image
    //         src={author?.image!}
    //         alt={author?.name!}
    //         width={48}
    //         height={48}
    //         className="rounded-full"
    //       />
    //     </Link>
    //   </div>

    //   <Link href={`/startup/${_id}`}>
    //     <p className="startup-card_desc">{description}</p>

    //     <img src={image} alt="placeholder" className="startup-card_img" />
    //   </Link>

    //   <div className="flex-between gap-6   mt-5">
    //     <Link href={`/?query=${category?.toLowerCase()}`}>
    //       <p className="text-16-medium">{category}</p>
    //     </Link>

    //     {isConnected && author?.walletAddress && (
    //       <Button
    //         onClick={() => setIsTipModalOpen(true)}
    //         className=" mt-4 startup-card_btn"
    //       >
    //         Tip
    //       </Button>
    //     )}

    //     <Button className="startup-card_btn mt-4 " asChild>
    //       <Link href={`/startup/${_id}`}>Details</Link>
    //     </Button>
    //   </div>




    //   {isTipModalOpen && author?.walletAddress && (
    //     <TipModal
    //       isOpen={isTipModalOpen}
    //       onClose={() => setIsTipModalOpen(false)}
    //       recipientAddress={author.walletAddress}
    //       startupTitle={title}
    //     />
    //   )}
    // </li>

    <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
      <div className="w-full aspect-w-16 aspect-h-10 bg-white rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
        <Link href={`/startup/${_id}`}>
          <img src={image} alt="placeholder"
            className="startup-card_img group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200" />
        </Link>
      </div>
      <div className=" p-4">
        <h2 className="font-bold my-4 text-lg text-zinc-700">
          Title
        </h2>
        <h2 className="font-normal my-4 text-sm text-zinc-500 line-clamp-2">
          {description}
        </h2>
        <div className="flex flex-row justify-between items-center mt-10">
          <span className="text-sm text-gray-500">{formatDate(_createdAt)}</span>

          {isConnected && author?.walletAddress && (

            // <div
            //   className="cursor-pointer relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs"
            //   onClick={() => setIsTipModalOpen(true)}
            // >
            //   Tip
            // </div>

            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl">
             Tip
            </span>
          </button>




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
            <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
              Read More
            </div>
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
