import { cookies } from "next/headers";
import NoPage from "./NoPage";
import Home from "./Home";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/utils/conf";

export default function Dashboard() {
    const token = cookies().get("token");
    const value = token?.value || "";

    if (value) {
        try {
            jwt.verify(value, JWT_SECRET);
            console.log(`${value}`)
            console.log(`${token?.value}`)
            console.log(`${JWT_SECRET}`);
        } catch (error) {
            return <NoPage label="You are not Logged In or Token Expired, Please" choice="Login" route="login" />;
        }
    } else {
        return <NoPage label="You are not Logged In or Token Expired, Please" choice="Login" route="login" />;
    }

    return <Home />;
}
