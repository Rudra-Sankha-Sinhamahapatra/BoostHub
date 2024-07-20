"use client"

import { useRouter } from "next/navigation";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BACKEND_URL } from "@/utils/conf";
import { useCallback } from "react";

export const Nav = () => {
    const router = useRouter();

    const homeHandler = useCallback(() => {
        router.push(`/home`);
    }, [router]);

    const createHandler = useCallback(() => {
        router.push(`/home/create`);
    }, [router]);

    const myCoursesHandler = useCallback(() => {
        router.push(`/home/mycourse`);
    }, [router]);

    const infoHandler = useCallback(() => {
        router.push(`/home/info`);
    }, [router]);

    const logout = useCallback(async () => {
        try {
            await axios.post(`${BACKEND_URL}/bh/v1/user/logout`, {}, {
                withCredentials: true,
            });

            toast.success("Logged out Successfully!");

            setTimeout(() => {
                router.push('/');
            }, 3200);
        } catch (error) {
            toast.error("Logout Failed", {
                autoClose: 2000
            });
        }
    }, [router]);

    return (
        <>
            <ToastContainer 
                position="top-center"
                autoClose={4000}
                closeOnClick
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <div className="sm:grid flex flex-col justify-center items-center sm:grid-cols-4 md:flex md:flex-row md:justify-center md:gap-5   gap-3 text-violet-500 mb-8 ml-3 mt-2">
                <div className="cursor-pointer hover:text-violet-700" onClick={myCoursesHandler}>My Courses</div>
                <div className="cursor-pointer hover:text-violet-700" onClick={homeHandler}>Home</div>
                <div className="cursor-pointer hover:text-violet-700" onClick={createHandler}>Create Course</div>
                <div className="cursor-pointer hover:text-violet-700" onClick={infoHandler}>Rules</div>
                <Button content="Logout" className="text-white bg-violet-500 py-2 px-3 rounded-md hover:bg-violet-700" onClick={logout} />
            </div>                
        </>
    );
}
