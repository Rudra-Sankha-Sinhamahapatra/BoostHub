import Login from "./Login";
import { cookies } from "next/headers";
import NoPage from "./NoPage";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/utils/conf";

export default function Signin() {
    const token = cookies().get("token");
    const value = token?.value || "";

    let isLoggedIn = false;
   console.log(`${JWT_SECRET}`);
    
    if (value) {
        try {
            const res = jwt.verify(value, JWT_SECRET);
            console.log(`${token}`);
            console.log(`${value}`)
            console.log(`${res}`)
            if (res) {
                isLoggedIn = true;
                console.log(``)
            }
        } catch (error) {
            console.error("Token verification error:");
        }
    }

    if (isLoggedIn) {
        console.log(`${value}`)
        console.log(`${token}`)
        return <NoPage label="You are Logged In, Please" choice="Logout" route="home" />;
    }

    return <Login />;
}
