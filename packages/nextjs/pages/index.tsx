import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";
import { cn } from "~~/utils/cn";

const Home: NextPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState(0);

  return (
    <>
      <MetaHeader />
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-3 border-r-[1.5px] border-white/10 h-full py-8 px-4">
          <h3 className="text-white/60">MENU</h3>
          <button
            className={cn(
              "btn block rounded-lg border-none w-full hover:opacity-80 normal-case text-left mt-4 mb-2",
              router.pathname === "/" ? "bg-white/10 hover:bg-white/10" : "bg-transparent hover:bg-white/5",
            )}
            onClick={() => router.push("/")}
          >
            Dashboard
          </button>
          <button
            className={cn(
              "btn block rounded-lg border-none w-full hover:opacity-80 normal-case text-left",
              router.pathname === "/calendar" ? "bg-white/10 hover:bg-white/10" : "bg-transparent hover:bg-white/5",
            )}
            onClick={() => router.push("/calendar")}
          >
            Calendar
          </button>
        </div>
        <div className="col-span-9 border-white/10 h-full py-8">
          <h1 className="font-bold text-3xl px-8">Dashboard</h1>
          <p className="text-gray-400 px-8 pb-4">Some description.</p>
          <div className="tabs border-b-2 border-white/10 px-8">
            <a
              onClick={() => setTab(1)}
              className={cn("tab tab-bordered", tab === 1 ? "tab-active !border-[#0165F9]" : "border-none")}
            >
              Boards
            </a>
            <a
              onClick={() => setTab(2)}
              className={cn("tab tab-bordered", tab === 2 ? "tab-active !border-[#0165F9]" : "border-none")}
            >
              Timeline
            </a>
            <a
              onClick={() => setTab(3)}
              className={cn("tab tab-bordered", tab === 3 ? "tab-active !border-[#0165F9]" : "border-none")}
            >
              History
            </a>
          </div>
          <div className="grid grid-cols-3 gap-x-6 gap-y-2 p-6">
            <div className="card col-span-1 bg-white/5 shadow-xl">
              <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  className="w-full h-[150px]"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title font-semibold mb-0">Trip to Florence</h2>
                <p className="my-2 text-white/70">🍝Day Trip to Florence: Explore the Best in One Day</p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
            <div className="card col-span-1 bg-white/5 shadow-xl">
              <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  className="w-full h-[150px]"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title font-semibold mb-0">Trip to Florence</h2>
                <p className="my-2 text-white/70">🍝Day Trip to Florence: Explore the Best in One Day</p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
            <div className="card col-span-1 bg-white/5 shadow-xl">
              <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  className="w-full h-[150px]"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title font-semibold mb-0">Trip to Florence</h2>
                <p className="my-2 text-white/70">🍝Day Trip to Florence: Explore the Best in One Day</p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
            <div className="card col-span-1 bg-white/5 shadow-xl">
              <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  className="w-full h-[150px]"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title font-semibold mb-0">Trip to Florence</h2>
                <p className="my-2 text-white/70">🍝Day Trip to Florence: Explore the Best in One Day</p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
