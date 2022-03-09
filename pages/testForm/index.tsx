import type { NextPage } from "next";
import Test from "../test";
const TestForm: NextPage = () => {
  return (
    <div className="grid min-h-screen gap-10 bg-slate-400 py-20 px-20 lg:grid-cols-2  xl:grid-cols-3 xl:place-content-center">
      <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-xl">
        <span className="text-2xl font-semibold">Select Item</span>
        <ul>
          <div className="my-2 flex justify-between ">
            <span className="text-gray-500">Grey Chair</span>
            <span className="font-semibold">$19</span>
          </div>
          <div className="my-2 flex justify-between ">
            <span className="text-gray-500">Grey Chair</span>
            <span className="font-semibold">$19</span>
          </div>
        </ul>

        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button
          className="mx-auto mt-5 block w-3/4
        rounded-xl bg-blue-500 p-3 text-center text-white 
        hover:bg-teal-500 hover:text-black
        focus:bg-red-500 active:bg-yellow-500
        "
        >
          Checkout
        </button>
      </div>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="p-6 pb-14 xl:pb-40 portrait:bg-indigo-600 landscape:bg-teal-500">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-zinc-300 transition-colors group-hover:bg-red-300" />
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative  -mt-14 -mb-5 flex flex-col items-center">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-xl lg:col-span-2">
        <div className="mb-5 flex items-center justify-between">
          <span>⬅️</span>
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="rounded-md p-2 shadow-xl">💖</span>
          </div>
        </div>
        <div className="mb-5 h-72 bg-zinc-400" />
        <div className="flex flex-col">
          <span className="text-xl font-medium">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex items-center justify-between">
            <div className="space-x-2">
              <button className="h-5 w-5 rounded-full bg-yellow-500 ring-yellow-500 ring-offset-2 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-indigo-500 ring-indigo-500 ring-offset-2 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-teal-500 ring-teal-500 ring-offset-2 transition focus:ring-2" />
            </div>
            <div className="flex items-center space-x-5">
              <button className=" flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className=" flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-medium">$450</span>
            <button className="rounded-lg bg-blue-500 py-2 px-8 text-center text-xs text-white">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestForm;
