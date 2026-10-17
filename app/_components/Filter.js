"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex border border-primary-800">
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="all"
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="small"
      >
        2&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="medium"
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="large"
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ children, handleFilter, filter, activeFilter }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter && "bg-primary-700 text-primary-50"}`}
    >
      {children}
    </button>
  );
}

export default Filter;
