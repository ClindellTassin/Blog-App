import React from "react";
import poster from "../../img/poster.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <section className="pb-10 bg-gray-800 h-screen">
        <div className="relative container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <span className="text-lg font-bold text-gray-100">
                Create posts to educate or share experiences
              </span>
              <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-green-700 font-bold font-heading">
                Pen down your ideas{" "}
                <span className="text-yellow-500">By creating a post</span>
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100">
                Our community is free from racism and unhealthy words
              </p>
              <Link
                to="/register"
                className="inline-block px-12 py-5 text-lg text-white font-bold bg-green-700 hover:bg-yellow-500 rounded-full transition duration-200"
              >
                Become a Blogger
              </Link>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <img src={poster} alt="poster" className="w-full h-m" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
