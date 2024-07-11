import { cookies } from "next/headers";
import NoPage from "./NoPage";
import Home from "./Home";

export default function Dashboard(){
    const token=cookies().get("token");
    if(!token){
    return <NoPage label="You are Not Logged In,Please" choice="Login" route="login" />
    }
    return(
        <>
     <Home/> 
        </>
    )
}