import Login from "./Login";
import { cookies } from "next/headers";
import NoPage from "./NoPage";

export default function Signin() {
    const token=cookies().get("token");
    if(token){
    return <NoPage label="You are Logged In,Please" choice="Logout" route="home" />
    }

    return (
       <Login/>
    );
}
