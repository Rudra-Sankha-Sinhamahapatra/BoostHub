import Footer from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Socials } from "@/utils/Socials";
import React from "react";

export default function Layout({
    children
}:{
    children:React.ReactNode
}): JSX.Element {
    return (
        <div className="bg-white dark:bg-black pt-3 flex flex-col min-h-screen">
            <Nav />
            <main className="flex-grow">
                {children}
            </main>
            <Footer className="bg-purple-500 text-white mt-4 sm:mr-0" owner="BoostHub@2024" socials={Socials} />
        </div>
    )
}
