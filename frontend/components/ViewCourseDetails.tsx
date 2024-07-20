"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/utils/conf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Button from './Button';
import Link from 'next/link';

interface Course {
    id: string;
    title: string;
    description: string;
    content: string;
    createdAt: {
        date: string;
        time: string;
    };
    updatedAt: {
        date: string;
        time: string;
    };
    teacher: {
        id: number;
        name: string;
        role: string;
    };
    totalLikes: string;
    totalRatings: string;
    averageRating: string;
    liked: boolean;
}

export const ViewCourseDetails = () => {
    const params = useParams();
    const id = params.courseId; 
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                if (id) {
                    const response = await axios.get(`${BACKEND_URL}/bh/v1/course/${id}`, {
                        withCredentials: true,
                    });
                    setCourse(response.data);
                } else {
                    console.warn("ID is not available");
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
                setError("Failed to fetch course details");
                toast.error("Failed to fetch course details");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    const handleLike = async () => {
        if(!course) return;
        try {
            const response = await axios.post(`${BACKEND_URL}/bh/v1/like/create`, {
                courseId: Number(id),
                liked: !course.liked
            }, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setCourse(prev => {
                    if(!prev) return prev;
                    const newLike = !prev.liked;
                    return {
                        ...prev,
                        liked: newLike,
                        totalLikes: newLike ? String(Number(prev.totalLikes) + 1) : String(Number(prev.totalLikes) - 1)
                    };
                });
                toast.success(course.liked ? "Course unliked" : "Course liked");
            } else {
                console.error('Unexpected response status:', response.status);
                toast.error("Failed to like course");
            }
        } catch (error) {
            console.error("Error liking course:", error);
            toast.error("Failed to like course");
        }
    };

    if (loading) {
        return <div className="dark:text-white flex justify-center mt-10">Loading ...</div>;
    }

    if (error) {
        return <div className="dark:text-white flex justify-center mt-10">Error Occurred: {error}</div>;
    }

    if (!course) {
        return <div className="dark:text-white flex justify-center mt-10">No course details available</div>;
    }

    return (
        <>
            <div>
                <div className="dark:text-white text-center mt-3 mb-3 text-2xl">
                    Course Details
                </div>
                <div className="dark:bg-black dark:text-white min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    <div className="flex justify-center">
                        <div key={course.id} className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-t-2 max-w-screen-md w-full">
                            <div className="flex-grow">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-violet-500 max-h-10 overflow-hidden overflow-ellipsis text-center">
                                    {course.title}
                                </h2>
                                <p className="font-bold mt-4 md:mt-6 text-violet-500">About</p>
                                <p className="text-gray-600 mt-2 md:mt-3 max-h-18 overflow-hidden overflow-ellipsis">{course.description}</p>
                                <p className="font-bold mt-4 md:mt-6 text-violet-500">Content</p>
                                <p className="text-gray-500 mt-2 md:mt-3 max-h-12 w-full overflow-hidden overflow-ellipsis">{course.content}</p>
                                <p className="font-bold mt-4 md:mt-6 text-violet-500">Teacher</p>
                                <p className="text-gray-500 mt-2 md:mt-3 max-h-12 w-full overflow-hidden overflow-ellipsis">{course.teacher.name}</p>
                                <p className="font-bold mt-4 md:mt-6 text-violet-500">Role</p>
                                <p className="text-gray-500 mt-2 md:mt-3 max-h-12 w-full overflow-hidden overflow-ellipsis">{course.teacher.role}</p>
                                <p className="font-bold mt-4 md:mt-6 text-violet-500">Created At: <span className="text-gray-500 mt-2 md:mt-3 max-h-12 w-full overflow-hidden overflow-ellipsis">{course.createdAt.date} at {course.createdAt.time}</span></p>
                                <p className="font-bold mt-4 md:mt-6 text-violet-500">Likes: <span className="text-gray-500 mt-2 md:mt-3 max-h-12 w-full overflow-hidden overflow-ellipsis">{course.totalLikes}</span></p>
                                <p className="font-bold mt-4 md:mt-6 text-violet-500">Ratings Given Users: <span className="text-gray-500 mt-2 md:mt-3 max-h-12 w-full overflow-hidden overflow-ellipsis">{course.totalRatings}</span></p>
                                <p className="font-bold mt-4 md:mt-6 text-violet-500">Rating: <span className="text-gray-500 mt-2 md:mt-3 max-h-12 w-full overflow-hidden overflow-ellipsis">{course.averageRating}</span></p>
                                <div className="flex flex-col md:flex-row md:space-x-3">
                                    <button
                                        onClick={handleLike}
                                        className={`w-fit mt-4 flex items-center justify-center p-2 rounded-full ${course.liked ? 'text-red-500' : 'text-violet-500'} hover:bg-gray-200`}
                                    >
                                        {course.liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                                        <span className="ml-2">{course.liked ? 'Unlike' : 'Like'}</span>
                                    </button>
                                    <Link href={`/home/course/${id}/comment`}>
                                        <Button content="Comments" className="text-white bg-violet-500 py-2 px-3 mt-4 md:mt-6 rounded-md mb-4 hover:bg-violet-700" />
                                    </Link>
                                    <Link href={`/home/course/${id}/feedback`}>
                                        <Button content="Feedbacks" className="text-white bg-violet-500 py-2 px-3 mt-4 md:mt-6 rounded-md mb-4 hover:bg-violet-700" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        </>
    );
};
