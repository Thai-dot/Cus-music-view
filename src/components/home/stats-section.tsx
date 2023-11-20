import { useAnimatedCounter } from "@/custom-hooks/use-animate-counter";
import React from "react";

export default function StatsSection() {
  const userCounter = useAnimatedCounter(1000, 0, 1.2);
  const playlistCounter = useAnimatedCounter(5000, 0, 1.2);
  const songCounter = useAnimatedCounter(6000, 0, 1.2);

  return (
    <section className="mb-32 text-center lg:text-left">
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-800">
        <div className="flex flex-wrap items-center">
          <div className="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
            <img
              src="https://tecdn.b-cdn.net/img/new/ecommerce/vertical/086.jpg"
              alt="Trendy Pants and Shoes"
              className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
            />
          </div>
          <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
            <div className="px-6 py-12 md:px-12">
              <h2 className="display-5 mb-6 text-4xl font-bold text-primary dark:text-primary-400">
                Why is it so great?
              </h2>
              <p className="mb-12 text-neutral-500 dark:text-neutral-300">
                Nunc tincidunt vulputate elit. Mauris varius purus malesuada
                neque iaculis malesuada. Aenean gravida magna orci, non
                efficitur est porta id. Donec magna diam.
              </p>

              <div className="grid md:grid-cols-3 lg:gap-x-12">
                <div className="mb-12 md:mb-0">
                  <h2 className="mb-4 text-3xl font-bold text-primary dark:text-primary-400">
                    {userCounter}+
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    User
                  </h5>
                </div>

                <div className="mb-12 md:mb-0">
                  <h2 className="mb-4 text-3xl font-bold text-primary dark:text-primary-400">
                    {playlistCounter}+
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    Playlists
                  </h5>
                </div>

                <div className="">
                  <h2 className="mb-4 text-3xl font-bold text-primary dark:text-primary-400">
                    {songCounter}+
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    Songs
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
