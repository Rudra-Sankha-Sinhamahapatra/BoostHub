"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils/conf";

export const AddRating = () => {
  const params = useParams();
  const courseId = params.courseId;

  const [rating, setRating] = useState<number>(0);
  const [ratings, setRatings] = useState<any[]>([]);

  const fetchRatings = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/bh/v1/rating/${courseId}/ratings`,
        {
          withCredentials: true,
        }
      );
      setRatings(response.data);
    } catch (error: any) {
      toast.error(
        `Error fetching ratings: ${
          error.response?.data.message || "Something went wrong"
        }`
      );
    }
  }, [courseId]);

  useEffect(() => {
    if (Number(courseId) > 0) {
      fetchRatings();
    }
  }, [courseId, fetchRatings]);

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BACKEND_URL}/bh/v1/rating/create`,
        {
          courseId: courseId,
          rating: rating,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Rating submitted successfully!");
      fetchRatings();
    } catch (error: any) {
      toast.error(
        `Error submitting rating: ${
          error.response?.data.message || "Something went wrong"
        }`
      );
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="dark:bg-black dark:text-white min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-5 text-2xl sm:text-3xl">
          Add Your Rating
        </div>
        <div className="flex flex-col w-full sm:w-4/5 lg:w-3/5 mx-auto gap-5">
          <form onSubmit={handleRatingSubmit}>
            <div className="">
              <input
                id="rating"
                type="number"
                min="1"
                max="5"
                className="text-black border border-black w-full p-2 h-20"
                value={rating}
                placeholder="Write your rating (1-5)"
                onChange={(e) => {
                  setRating(parseInt(e.target.value));
                }}
                required
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="text-white bg-violet-500 py-2 px-4 rounded-md mt-4 mb-4 hover:bg-violet-700"
                content="Add Rating"
              />
            </div>
          </form>
          <div className="mt-8">
            <h2 className="text-center text-violet-500 font-semibold text-2xl">
              All Ratings:
            </h2>
            <ul className="mt-4 space-y-4">
              {ratings.map((r) => (
                <li
                  key={r.id}
                  className="border p-4 rounded-md 
                  border-gray-300 
                  dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="font-semibold">{r.user.name}</div>
                    <div className="text-gray-500 text-sm sm:text-base">
                      {new Date(r.updatedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <div>Rating: {r.rating} stars</div>
                    <div>{r.comment}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
