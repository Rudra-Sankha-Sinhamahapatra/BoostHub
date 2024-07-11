import CreateAccount from "./CreateAccount";
import { cookies } from "next/headers";
import NoPage from "./NoPage";

export default function Signup() {
    const token=cookies().get("token");
    if(token){
    return <NoPage label="You are Logged In,Please" choice="Logout" route="home" />
    }

    return (
       <CreateAccount/>
    );
}
