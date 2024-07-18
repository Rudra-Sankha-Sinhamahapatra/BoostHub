
import Footer from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Socials } from "@/utils/Socials";
import React from "react";

export default function layout({
    children
}:{
    children:React.ReactNode
}):JSX.Element {
    return(
        <div className="bg-white dark:bg-black pt-3">
            <div>
            <Nav/> 
            </div>
            <div>
            {children}
            </div>
            <Footer className="bg-purple-500 text-white" owner="BoostHub@2024" socials={Socials}/>
        </div>
    )
}