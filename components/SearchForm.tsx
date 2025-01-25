import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
    return (
        // <Form action="/" scroll={false} className="search-form">
        //     <input
        //         name="query"
        //         defaultValue={query}
        //         className="search-input"
        //         placeholder="Search Content"
        //     />
        
        //     <div className="flex gap-2">
        //         {query && <SearchFormReset />}
        
        //         <button type="submit" className="search-btn text-white">
        //             <Search className="size-5" />
        //         </button>
        //     </div>
        // </Form>
        
        
        <Form action="/" scroll={false} className="max-w-md mx-auto">
        {/* // <form className="max-w-md mx-auto"> */}
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                name="query"
                defaultValue={query}
                // className="search-input"
                placeholder="Search Content"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
                {/* <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required /> */}
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-black/85 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        {/* // </form> */}
        </Form>

    )
}

export default SearchForm
