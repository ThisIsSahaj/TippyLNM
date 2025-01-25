'use client'
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleSignIn, handleSignOut } from "@/app/actions";
import { WalletButton } from "./NavbarClient";
import SearchForm from "./SearchForm";
import { useSearchParams } from "next/navigation";

// const Navbar = async () => {
  const Navbar = ({ session }: { session: any }) => {
  // const session = await auth();

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans fixed w-full z-10 ">
      <nav className="flex justify-between items-center">
        
        <Link href="/" className="items-center gap-4 w-full hidden sm:flex">
          <p className="text-2xl font-bold">ArtTipia</p>
          <span className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Beta</span>
        </Link>
        
        <div className="hidden sm:block w-full">
        <SearchForm query={query} />
        </div>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <WalletButton />

              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form action={handleSignOut}>
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form action={handleSignIn}>
              {/* <button type="submit">Login</button> */}

              <button type="submit" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
                </svg>
                Sign in with Github
              </button>


            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
