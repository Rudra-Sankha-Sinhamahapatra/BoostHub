import { BACKEND_URL } from "@/utils/conf";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import {useRouter} from "next/navigation";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const router=useRouter();

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/bh/v1/course/courses`, {
                withCredentials: true,
            });
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Fetch error:", error);
            setError("Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return <div className="dark:text-white flex justify-center mt-10">Loading ...</div>;
    }

    if (error) {
        return <div className="dark:text-white flex justify-center mt-10">Error Occurred: {error}</div>;
    }

    return (
        <>
            <div className="min-h-screen dark:bg-black bg-white dark:text-white">
                <h1 className="dark:text-white text-center mb-5">Available Courses</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {courses.length > 0 ? (
                        courses.map((course: any) => (
                            <div key={course.id} className="bg-white shadow-lg rounded-lg p-4 pr-1 border border-t-2 max-h-80">
                                <div className="flex-grow">
                                <h2 className="text-xl font-semibold text-violet-500 max-h-10 overflow-hidden overflow-ellipsis">{course.title}</h2>
                                <p className="font-bold mt-2 text-violet-500">About</p>
                                <p className="text-gray-600 mt-1 max-h-18 overflow-hidden overflow-ellipsis">{course.description}</p>
                                <p className="font-bold mt-2 text-violet-500">Content</p>
                                <p className="text-gray-500 mt-1 max-h-12 w-full  overflow-hidden overflow-ellipsis">{course.content}</p>
                                </div>
                                <div className="mt-4">
                                    <Button className="bg-violet-500 text-white rounded px-3 py-1 hover:bg-violet-700" content="View Details"
                                    onClick={()=>{
                                        router.push(`/home/course/${course.id}`)
                                    }}></Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-bold">No courses available.</p>
                    )}
                </div>
            </div>
        </>
    );
}
